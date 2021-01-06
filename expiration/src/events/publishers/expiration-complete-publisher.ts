import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@ldctickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
