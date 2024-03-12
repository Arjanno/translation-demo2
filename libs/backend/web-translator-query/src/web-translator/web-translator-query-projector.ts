import { eventHandler } from '@ebd-connect/cqrs-framework'
import {   translationPriceQueryDb,} from './web-translator-query-db'
import {   TranslationPriceDetermined,} from '@api/web-translator-event'

export class TranslationPriceQueryProjector {
    @eventHandler({name:'TranslationPriceDetermined'})
    async onTranslationPriceDetermined({translationId: id,...data}: TranslationPriceDetermined) {
      await translationPriceQueryDb.create(id, {translationId: id,...data})
    }
}
