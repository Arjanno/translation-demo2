import { QueryDatabaseModel } from '@ebd-connect/cqrs-framework'
import {   ITranslationPrice,} from '@api/web-translator-query'

export const translationPriceQueryDb
  = new QueryDatabaseModel< ITranslationPrice >('translation-price')

