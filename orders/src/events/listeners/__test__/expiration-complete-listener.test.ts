import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import mongoose from "mongoose";
import { Order, OrderStatus } from "../../../models/order";
import { ExpirationCompleteEvent } from "@ldctickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: "sdfsdf",
    expiresAt: new Date(),
    ticket,
  });

  await order.save();

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, ticket, data, msg };
};

it("updates the order status to cancelled", async () => {
  const { listener, order, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updateOrder = await Order.findById(order.id);

  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
});
it("emits order cancelled event", async () => {
  const { listener, order, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(eventData.id).toEqual(order.id);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
it("acks the message", async () => {
  const { listener, order, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
