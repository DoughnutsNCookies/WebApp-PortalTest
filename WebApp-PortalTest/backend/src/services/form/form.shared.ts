// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Form, FormData, FormPatch, FormQuery, FormService } from './form.class'

export type { Form, FormData, FormPatch, FormQuery }

export type FormClientService = Pick<FormService<Params<FormQuery>>, (typeof formMethods)[number]>

export const formPath = 'form'

export const formMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const formClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(formPath, connection.service(formPath), {
    methods: formMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [formPath]: FormClientService
  }
}
