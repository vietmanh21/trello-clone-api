/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
// ManhNguyen
// 4mIC1fEbRlAfiN65

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khoi tao doi tuong trelloDatabaseInstance ban dau la null
let trelloDatabaseInstance = null

// Khoi tao mot doi tuong instance de ket noi voi DB
const mongoClientInstance = new MongoClient(env.MONGODB_URI,
  {
      serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true
      }
  })

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect database first')
  return trelloDatabaseInstance
}
