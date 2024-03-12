import { TranslationPriceNotFound } from '@api/web-translator-event';

import { TranslationPriceDetermined } from '@api/web-translator-event';

import { TranslationPrice } from '@api/web-translator-command';


import { TranslationRequestSubmitted } from '@api/web-translator-event';

import { SubmitTranslationRequest } from '@api/web-translator-command';


import {
  AggregateRoot,
  eventSourcingHandler,
} from '@ebd-connect/cqrs-framework';

export class Translation extends AggregateRoot {
  private approved! : string;
  private errorMessage! : string;
  private price! : string;
  private text! : string;
  private translationId! : string;
  //when
  //start TranslationPrice
  public translationPrice( command: TranslationPrice, calcPrice: {({text}: {text: string})} ) {
    const result = calcPrice({text:command.text})
    if (result.price) {
      this.apply(TranslationPriceDetermined, { ...command , price: result.price });
   }
    if (result.errorMessage) {
      this.apply(TranslationPriceNotFound, { ...command , errorMessage: result.errorMessage });
   }
  }
  @eventSourcingHandler({ name: 'TranslationPriceDetermined' })
  onTranslationPriceDetermined(event: TranslationPriceDetermined) {
    this.text = event.text;
    this.price = event.price;
    this.translationId = event.translationId;
  }

  @eventSourcingHandler({ name: 'TranslationPriceNotFound' })
  onTranslationPriceNotFound(event: TranslationPriceNotFound) {
    this.translationId = event.translationId;
    this.errorMessage = event.errorMessage;
  }

  //end TranslationPrice

  //start SubmitTranslationRequest
  public submitTranslationRequest(translationId: string, command: SubmitTranslationRequest ) {

      this.apply(TranslationRequestSubmitted, { ...command ,translationId });

  }
  @eventSourcingHandler({ name: 'TranslationRequestSubmitted' })
  onTranslationRequestSubmitted(event: TranslationRequestSubmitted) {
    this.text = event.text;
    this.translationId = event.translationId;
  }

  //end SubmitTranslationRequest

  //end when
}
