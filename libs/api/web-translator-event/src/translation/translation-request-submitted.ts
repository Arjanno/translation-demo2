import { Event } from '@ebd-connect/cqrs-framework';

export class TranslationRequestSubmitted implements Event {
  constructor(
    public readonly text : string,
    public readonly translationId : string,
  ) {}
}
