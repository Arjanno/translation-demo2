import { Query, query } from '@ebd-connect/cqrs-framework'

export interface ITranslationPrice {
  translationId : string,
  price : string,
}

@query('TranslationPrice')
export class TranslationPrice implements Query {
  $responseType!: ITranslationPrice | null
  constructor(
    public readonly translationId : string,
    public readonly price : string,
  ) {}
}

