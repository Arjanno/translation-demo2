import { command, Command } from '@ebd-connect/cqrs-framework';

@command('DetermineTranslationPrice')
export class DetermineTranslationPrice implements Command {
  constructor(
    public readonly text : string,
    public readonly translationId : string,
) {}

}
