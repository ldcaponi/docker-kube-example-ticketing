import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  await request(app)
    .get(`/api/tickets/${mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(404);
});
it("returns the ticekt if it is found", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("concert");
  expect(ticketResponse.body.price).toEqual(20);
});
