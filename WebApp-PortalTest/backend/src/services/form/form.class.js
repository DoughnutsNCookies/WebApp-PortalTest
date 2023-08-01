import { BadRequest } from '@feathersjs/errors'
import { MongoDBService } from '@feathersjs/mongodb'

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class FormService extends MongoDBService {
  async create(data, params) {
    const requiredFields = [
      'email',
      'fullName',
      'telephone',
      'dateOfBirth',
      'gender',
      'nationality',
      'religion',
      'occupation',
      'address',
      'companyName',
      'monthlyContribution',
      'shares',
      'bankAccountNumber',
      'bankName',
      'authorityLevel'
    ]
    const missingFields = requiredFields.filter((field) => !data[field])
    if (missingFields.length > 0) {
      throw new BadRequest('Missing fields: ' + missingFields.join(', '))
    }
    data.creatorId = params.user._id;
    return super.create(data, params)
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('form'))
  }
}
