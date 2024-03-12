import { command, Command } from '@ebd-connect/cqrs-framework';

@command('ApproveTranslationPrice')
export class ApproveTranslationPrice implements Command {
  constructor(
    public readonly translationId : string,
    public readonly price : string,
    public readonly approved : string,
) {}

}
