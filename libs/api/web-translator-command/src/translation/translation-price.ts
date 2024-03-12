import { command, Command } from '@ebd-connect/cqrs-framework';

@command('TranslationPrice')
export class TranslationPrice implements Command {
  constructor(
    public readonly text : string,
    public readonly translationId : string,
) {}

}
