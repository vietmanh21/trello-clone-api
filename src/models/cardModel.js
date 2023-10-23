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
  cover: Joi.string().default('https://pixabay.com/vi/photos/nh%C3%A0-m%C3%A1y-c%C3%A2y-t%C3%B9ng-b%C3%A1ch-c%C3%A0nh-c%C3%A2y-r%E1%BB%ABng-8297610/'),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async(data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}


const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const insertValues = {
      ...validData,
      columnId: new ObjectId(validData.columnId)
    }

    const createdCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(insertValues)

    return createdCard
  } catch (error) { throw new Error(error) }
}


const update = async (id, data) => {
  try {
    const updateData = { ...data }

    if (updateData.boardId) updateData.boardId = new ObjectId(updateData.boardId)

    if (updateData.columnId) updateData.columnId = new ObjectId(updateData.columnId)

    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { new: true }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateMany = async (ids, data) => {
  try {
    const tranformIds = ids.map(i => new ObjectId(i))
    const cardCollection = await GET_DB().collection(CARD_COLLECTION_NAME).updateMany(
      { _id: { $in: tranformIds } },
      { $set: data },
      { new: true }
    )
    return cardCollection
  } catch (error) {
    throw new Error(error)
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  update,
  updateMany
}