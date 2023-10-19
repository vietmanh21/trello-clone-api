import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

// const validateSchema = async(data) => {
//   await CARD_COLLECTION_NAME.validateAsync(data, { abortEarly: false })
// }

const createNew = async(data) => {
  try {
    // const validValues = await validateSchema(data)

    const insertValues = {
      ...data,
      boardId: new ObjectId(data.boardId),
      columnId: new ObjectId(data.columnId)
    }

    const cardCollection = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(insertValues)
    return cardCollection
  } catch (error) {
    throw new Error(error)
  }
}

// const update = async(data) => {
//   try {
//     // const validValues = await validateSchema(data)

//     const cardCollection = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAnhUpdate(
//       {_id: new ObjectId()})
//   } catch (error) {
//     throw new Error(error)
//   }
// }

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew
  // update
}