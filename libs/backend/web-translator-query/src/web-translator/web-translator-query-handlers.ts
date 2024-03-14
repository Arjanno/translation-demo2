import { QueryReturnType, queryHandler } from '@ebd-connect/cqrs-framework'
import {   TranslationPrice,} from '@api/web-translator-query'
import {   translationPriceQueryDb,} from './web-translator-query-db'

export class WebTranslatorQueryHandlers {
  @queryHandler({ name:'TranslationPrice'})
  async translationPrice({translationId,}: TranslationPrice): QueryReturnType< TranslationPrice > {
    return translationPriceQueryDb.find(translationId)
  }
}
