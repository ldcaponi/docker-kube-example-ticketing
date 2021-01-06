import { OrderCancelledEvent, Publisher, Subjects } from "@ldctickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
