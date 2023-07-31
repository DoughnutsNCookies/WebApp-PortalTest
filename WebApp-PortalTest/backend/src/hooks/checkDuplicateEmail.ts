const { Forbidden } = require('@feathersjs/errors')

module.exports = () => {
  return async (context: any) => {
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
