type returnTypeCalcPrice = {price: number} | {errorMessage: string}
type returnTypeTranslate = {translatedText: string} | {errorMessage: string}

export const translatorService = {
  calcPrice: ({text}: {text: string}): returnTypeCalcPrice  => {
    if (text.endsWith('error')) {
      return {errorMessage: 'there was some error'}
    }
    return {price: 12.00}
  },
  translate: ({text}: {text: string}): returnTypeTranslate  => {
    if (text.endsWith('error')) {
      return {errorMessage: 'there was some error'}
    }
    return {translatedText: 'translated text'}
  }
}
