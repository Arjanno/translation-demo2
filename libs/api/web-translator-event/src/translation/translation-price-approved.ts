import { Event } from '@ebd-connect/cqrs-framework';

export class TranslationPriceApproved implements Event {
  constructor(
    public readonly translationId : string,
    public readonly approved : boolean,
  ) {}
}
