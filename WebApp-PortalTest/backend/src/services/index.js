import { form } from './form/form.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(form)
  app.configure(user)

  // All services will be registered here
}
