import { TranslationApplicationService } from './translation-application-service';

import { Type } from '@ebd-connect/cqrs-framework';

export const webTranslatorCommandHandlers: Type[] = [
  //services
  TranslationApplicationService,

];
