import { Event } from '@ebd-connect/cqrs-framework';

export class TranslationPriceDetermined implements Event {
  constructor(
    public readonly text : string,
    public readonly price : string,
    public readonly translationId : string,
  ) {}
}
