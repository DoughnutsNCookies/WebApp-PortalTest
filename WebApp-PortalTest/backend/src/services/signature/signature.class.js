import { NotFound } from '@feathersjs/errors'
import { MongoDBService } from '@feathersjs/mongodb'
import fs from 'fs'

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SignatureService extends MongoDBService {
  async get(id, params) {
    const imagePath = './uploads/'
    try {
      const icFrontBinaryData = fs.readFileSync(imagePath + id + '-icfront.png')
      const icFrontBase64Image = 'data:image/png;base64,' + icFrontBinaryData.toString('base64')
      const icBackBinaryData = fs.readFileSync(imagePath + id + '-icback.png')
      const icBackBase64Image = 'data:image/png;base64,' + icBackBinaryData.toString('base64')

      const query = await super.find({ query: { formId: id } })
      if (query.total === 0) throw new NotFound('Documents not found')
      return { icFront: icFrontBase64Image, icBack: icBackBase64Image, signature: query.data[0].signature }
    } catch (error) {
      console.error('Error converting image to Base64:', error)
      throw new NotFound('Documents not found')
    }
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('signature'))
  }
}
