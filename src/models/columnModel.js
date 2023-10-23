import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé
  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async(data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}


const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const insertValues = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    }

    const createdColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(insertValues)

    return createdColumn
  } catch (error) { throw new Error(error) }
}

const pushCardOrder = async(columnId, cardId) => {
  try {
    const columnCollection = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(columnId) },
      { $push: { cardOrderIds: cardId } },
      { new: true }
    )
    return columnCollection
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }

    if (updateData.boardId) updateData.boardId = new ObjectId(updateData.boardId)

    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { new: true }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  pushCardOrder,
  update
}