import { Publisher, Subjects, TicketUpdatedEvent } from "@ldctickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
