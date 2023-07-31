// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { MongoClient } from 'mongodb'
import type { Db } from 'mongodb'
import type { Application } from './declarations'

const dotenv = require('dotenv')
dotenv.config()

declare module './declarations' {
  interface Configuration {
    mongodbClient: Promise<Db>
  }
}

export const mongodb = (app: Application) => {
  const mongodb_username = process.env.MONGODB_USERNAME
  const mongodb_password = process.env.MONGODB_PASSWORD
  const mongodb_cluster = process.env.MONGODB_CLUSTER
  const mongodb_uri =
    'mongodb+srv://' +
    mongodb_username +
    ':' +
    mongodb_password +
    '@' +
    mongodb_cluster +
    '/?retryWrites=true&w=majority'

  const database = new URL(mongodb_uri).pathname.substring(1)
  const mongoClient = MongoClient.connect(mongodb_uri).then((client) => client.db(database))

  app.set('mongodbClient', mongoClient)
}
