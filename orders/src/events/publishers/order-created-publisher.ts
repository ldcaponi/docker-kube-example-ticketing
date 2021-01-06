import { OrderCreatedEvent, Publisher, Subjects } from "@ldctickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
