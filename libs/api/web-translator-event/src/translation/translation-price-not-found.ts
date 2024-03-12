import { Event } from '@ebd-connect/cqrs-framework';

export class TranslationPriceNotFound implements Event {
  constructor(
    public readonly translationId : string,
    public readonly errorMessage : string,
  ) {}
}
