import { Publisher, Subjects, TicketCreatedEvent } from "@ldctickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
