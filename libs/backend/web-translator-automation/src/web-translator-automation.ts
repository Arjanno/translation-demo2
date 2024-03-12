import { TranslationPriceProcessor} from './translation/translation-price-processor';
import { Type } from "@ebd-connect/cqrs-framework";

export const webTranslatorProcessors: Type[] = [
  TranslationPriceProcessor,
]
