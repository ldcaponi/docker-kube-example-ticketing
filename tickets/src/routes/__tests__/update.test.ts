import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/Ticket";

const generateId = () => new mongoose.Types.ObjectId().toHexString();

it("returns a 404 if provided ID does not exist", async () => {
  await request(app)
    .put(`/api/tickets/${generateId()}`)
    .set("Cookie", global.signin())
    .send({ title: "asdf", price: 20 })
    .expect(404);
});
it("returns a 401 if user is not authenticated", async () => {
  await request(app)
    .put(`/api/tickets/${generateId()}`)
    .send({ title: "asdf", price: 20 })
    .expect(401);
});
it("returns a 401 if user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "asdf", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "assdfdf", price: 200 })
    .expect(401);
});
it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "asdf", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "valid title", price: -20 })
    .expect(400);
});
it("succeeds under correct conditions", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "asdf", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "valid title", price: 200 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("valid title");
});

it("publishes an event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "asdf", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "valid title", price: 200 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
});

it("rejects updates if the ticket is reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "asdf", price: 20 })
    .expect(201);

  const newTicket = await Ticket.findById(response.body.id);
  newTicket?.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await newTicket?.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "valid title", price: 200 })
    .expect(400);
});
