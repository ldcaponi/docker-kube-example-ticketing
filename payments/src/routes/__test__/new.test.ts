import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@ldctickets/common";

jest.mock("../../stripe");
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

it("returns 404 when purchasing order that DNE", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "asdfsdf",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns 401 when purchasing order that the user does not own", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "asdfsdf",
      orderId: order.id,
    })
    .expect(401);
});

it("returns 400 when purchasing order that is cancelled", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "asdfsdf",
      orderId: order.id,
    })
    .expect(400);
});
it("returns 201 with valid inputs", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  expect(stripe.charges.create).toHaveBeenCalled();

  const payments = await Payment.find({});
  expect(payments.length).toEqual(1);
});
// it('returns 404 when purchasing order that DNE', async () => {})
