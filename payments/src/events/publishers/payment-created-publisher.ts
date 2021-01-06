import { PaymentCreatedEvent, Publisher, Subjects } from "@ldctickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
