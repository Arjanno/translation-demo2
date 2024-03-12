import { QueryDatabaseModel,Type } from '@ebd-connect/cqrs-framework'
import { WebTranslatorQueryHandlers } from './web-translator/web-translator-query-handlers'
import {
  //dbModelsImports
    translationPriceQueryDb,

} from './web-translator/web-translator-query-db'

export const webTranslatorQueryHandlers: Type[] = [
  WebTranslatorQueryHandlers,
]

export const webTranslatorDatabaseModels: QueryDatabaseModel[] = [
  //dbModelsDefs
    translationPriceQueryDb, //model

]
