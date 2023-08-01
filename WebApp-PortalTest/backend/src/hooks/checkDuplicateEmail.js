import { Forbidden } from '@feathersjs/errors'

export const checkDuplicateEmail = () => {
  return async (context) => {
    const { app, data } = context
    const { email } = data

    const userExists = await app.service('users').find({
      query: { email }
    })

    if (userExists.total !== 0) {
      throw new Forbidden('Email already exists')
    }

    return context
  }
}
