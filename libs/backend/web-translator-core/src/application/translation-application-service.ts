import { ApproveTranslationPrice } from '@api/web-translator-command';


import { TranslationPrice } from '@api/web-translator-command';
import { translatorService } from '@backend/infrastructure';

import { SubmitTranslationRequest } from '@api/web-translator-command';


import { Translation } from '../domain/translation';

import { CommandContext, commandHandler,CommandReturnType } from '@ebd-connect/cqrs-framework';

export class TranslationApplicationService {
  //commandHandlers
  @commandHandler({ name: 'ApproveTranslationPrice' })
  async approveTranslationPrice(command: ApproveTranslationPrice, { eventSourcing }: CommandContext) {
    await eventSourcing.load(Translation, command.translationId, (eventStream) =>
      eventStream.approveTranslationPrice(command )
    );
  }

  //end ApproveTranslationPrice

  @commandHandler({ name: 'TranslationPrice' })
  async translationPrice(command: TranslationPrice, { eventSourcing }: CommandContext) {
    await eventSourcing.load(Translation, command.translationId, (eventStream) =>
      eventStream.translationPrice(command ,translatorService.calcPrice)
    );
  }

  //end TranslationPrice

  @commandHandler({ name: 'SubmitTranslationRequest' })

  async submitTranslationRequest(command: SubmitTranslationRequest, { eventSourcing }: CommandContext): CommandReturnType<SubmitTranslationRequest> {
    const translationId= command?.translationId ? command?.translationId : crypto.randomUUID();

    await eventSourcing.create(Translation, translationId, (eventStream) => eventStream.submitTranslationRequest(translationId, command)
  );
  return { translationId };
  }
  //end SubmitTranslationRequest

}
