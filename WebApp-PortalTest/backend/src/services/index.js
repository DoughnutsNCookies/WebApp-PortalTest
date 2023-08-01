import { signature } from './signature/signature.js'

import { form } from './form/form.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(signature)

  app.configure(form)
  app.configure(user)

  // All services will be registered here
}
