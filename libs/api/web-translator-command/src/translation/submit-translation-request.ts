import { command, RespondingCommand } from '@ebd-connect/cqrs-framework';

@command('SubmitTranslationRequest')
export class SubmitTranslationRequest implements RespondingCommand {
  constructor(
    public readonly text : string,
    public readonly translationId : string,
) {}
  $responseType!: { translationId : string }
}
