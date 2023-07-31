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
} from './form.schema'

import type { Application } from '../../declarations'
import { FormService, getOptions } from './form.class'
import { formPath, formMethods } from './form.shared'

export * from './form.class'
export * from './form.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const form = (app: Application) => {
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
      create: [schemaHooks.validateData(formDataValidator), schemaHooks.resolveData(formDataResolver)],
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

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [formPath]: FormService
  }
}
