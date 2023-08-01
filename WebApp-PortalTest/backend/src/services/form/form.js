// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  formDataValidator,
  formPatchValidator,
  formQueryValidator,
  formResolver,
  formExternalResolver,
  formDataResolver,
  formPatchResolver,
  formQueryResolver
} from './form.schema.js'
import { FormService, getOptions } from './form.class.js'
import { formPath, formMethods } from './form.shared.js'

export * from './form.class.js'
export * from './form.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const form = (app) => {
  // Register our service on the Feathers application
  app.use(formPath, new FormService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: formMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(formPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(formExternalResolver),
        schemaHooks.resolveResult(formResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(formQueryValidator), schemaHooks.resolveQuery(formQueryResolver)],
      find: [],
      get: [],
      create: [],
      patch: [schemaHooks.validateData(formPatchValidator), schemaHooks.resolveData(formPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
