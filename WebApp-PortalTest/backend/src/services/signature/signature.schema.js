// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const signatureSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Signature', additionalProperties: false }
)
export const signatureValidator = getValidator(signatureSchema, dataValidator)
export const signatureResolver = resolve({})

export const signatureExternalResolver = resolve({})

// Schema for creating new entries
export const signatureDataSchema = Type.Pick(signatureSchema, ['text'], {
  $id: 'SignatureData'
})
export const signatureDataValidator = getValidator(signatureDataSchema, dataValidator)
export const signatureDataResolver = resolve({})

// Schema for updating existing entries
export const signaturePatchSchema = Type.Partial(signatureSchema, {
  $id: 'SignaturePatch'
})
export const signaturePatchValidator = getValidator(signaturePatchSchema, dataValidator)
export const signaturePatchResolver = resolve({})

// Schema for allowed query properties
export const signatureQueryProperties = Type.Pick(signatureSchema, ['_id', 'text'])
export const signatureQuerySchema = Type.Intersect(
  [
    querySyntax(signatureQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const signatureQueryValidator = getValidator(signatureQuerySchema, queryValidator)
export const signatureQueryResolver = resolve({})
