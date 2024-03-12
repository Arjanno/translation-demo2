import { Type } from "@ebd-connect/cqrs-framework";
import {
//queryProjectorImports
      TranslationPriceQueryProjector,

} from './web-translator/web-translator-query-projector'

export const webTranslatorQueryProjectors: Type[] = [
//TypeDefs
TranslationPriceQueryProjector, //projector

]
