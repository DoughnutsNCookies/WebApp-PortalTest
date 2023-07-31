// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Form, FormData, FormPatch, FormQuery } from './form.schema'

export type { Form, FormData, FormPatch, FormQuery }

export interface FormParams extends MongoDBAdapterParams<FormQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class FormService<ServiceParams extends Params = FormParams> extends MongoDBService<
  Form,
  FormData,
  FormParams,
  FormPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('form'))
  }
}
