type returnType = {messageId: string} | {errorMessage: string}

export const emailService = {
  send: ({email}: {email: string}): returnType  => {
    if (email.endsWith('error.com')) {
      console.log(`Did NOT send email to ${email}`)
      return {errorMessage: 'there was some error'}
    }
    console.log(`Send email to ${email}`)
    return {messageId: crypto.randomUUID()}
  }
}
