// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const formSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Form', additionalProperties: false }
)
export type Form = Static<typeof formSchema>
export const formValidator = getValidator(formSchema, dataValidator)
export const formResolver = resolve<Form, HookContext>({})

export const formExternalResolver = resolve<Form, HookContext>({})

// Schema for creating new entries
export const formDataSchema = Type.Pick(formSchema, ['text'], {
  $id: 'FormData'
})
export type FormData = Static<typeof formDataSchema>
export const formDataValidator = getValidator(formDataSchema, dataValidator)
export const formDataResolver = resolve<Form, HookContext>({})

// Schema for updating existing entries
export const formPatchSchema = Type.Partial(formSchema, {
  $id: 'FormPatch'
})
export type FormPatch = Static<typeof formPatchSchema>
export const formPatchValidator = getValidator(formPatchSchema, dataValidator)
export const formPatchResolver = resolve<Form, HookContext>({})

// Schema for allowed query properties
export const formQueryProperties = Type.Pick(formSchema, ['_id', 'text'])
export const formQuerySchema = Type.Intersect(
  [
    querySyntax(formQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type FormQuery = Static<typeof formQuerySchema>
export const formQueryValidator = getValidator(formQuerySchema, queryValidator)
export const formQueryResolver = resolve<FormQuery, HookContext>({})
