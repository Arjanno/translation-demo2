import { Processor, automationFactory, eventHandler,messageBus,} from "@ebd-connect/cqrs-framework"
import {TranslationPrice,} from "@api/web-translator-command";
import {TranslationPriceDetermined,TranslationPriceNotFound,} from "@api/web-translator-event";
import {TranslationRequestSubmitted,} from "@api/web-translator-event";

interface TranslationRequest {
  text?: string,  translationId?: string,}

export class TranslationPriceProcessor
implements Processor<TranslationRequest>
{
  private readonly automation = automationFactory.forProcessor(this)

  async process(data: TranslationRequest): Promise<void> {
    if ( data.text&&  data.translationId)
      await messageBus.execute(new TranslationPrice(
        data.text,      data.translationId,
      ))
  }

  @eventHandler({name: 'TranslationRequestSubmitted'})
  async onTranslationRequestSubmitted(event: TranslationRequestSubmitted) {
    await this.automation.add(event.translationId, {
       text: event.text,  translationId: event.translationId,
    })
  }

  @eventHandler({name: 'TranslationPriceDetermined'})
  async onTranslationPriceDetermined(event: TranslationPriceDetermined) {
    await this.automation.onComplete(event.translationId)
  }
  @eventHandler({name: 'TranslationPriceNotFound'})
  async onTranslationPriceNotFound(event: TranslationPriceNotFound) {
    await this.automation.onComplete(event.translationId)
  }

}
