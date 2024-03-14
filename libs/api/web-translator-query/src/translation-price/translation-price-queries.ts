import { Query, query } from '@ebd-connect/cqrs-framework'

export interface ITranslationPrice {
  translationId : string,
  price : string,
  text: string,
  approved: boolean,
}

@query('TranslationPrice')
export class TranslationPrice implements Query {
  $responseType!: ITranslationPrice | null
  constructor(
    public readonly translationId : string,
    public readonly price : string,
    public readonly text: string,
    public readonly approved: boolean,
  ) {}
}

