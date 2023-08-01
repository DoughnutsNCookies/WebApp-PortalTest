// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const formSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Form', additionalProperties: false }
)
export const formValidator = getValidator(formSchema, dataValidator)
export const formResolver = resolve({})

export const formExternalResolver = resolve({})

// Schema for creating new entries
export const formDataSchema = Type.Pick(formSchema, ['text'], {
  $id: 'FormData'
})
export const formDataValidator = getValidator(formDataSchema, dataValidator)
export const formDataResolver = resolve({})

// Schema for updating existing entries
export const formPatchSchema = Type.Partial(formSchema, {
  $id: 'FormPatch'
})
export const formPatchValidator = getValidator(formPatchSchema, dataValidator)
export const formPatchResolver = resolve({})

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
export const formQueryValidator = getValidator(formQuerySchema, queryValidator)
export const formQueryResolver = resolve({})
