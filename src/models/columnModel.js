import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const columnCollectionName = 'column'
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
  // sẽ không xoá ngay ko chỉ ko hiện lên cho phía cilent thấy
})

const validateSchema = async(data) => {
  await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async(data) => {
  try {
    const validValues = await validateSchema(data)

    const columnCollection = await GET_DB().collection(columnCollectionName).insertOne(validValues)
    console.log(columnCollection)
  } catch (error) {
    new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
  } 
}

const update = async(id, data) => {
  try {
    const columnCollection = await GET_DB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnNewDocument: true } // tra về bản ghi mới cho client
    )
    console.log(columnCollection)
    return columnCollection.value()

  } catch (error) {
    new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
  }
}
  


export const columnModel = {
  createNew, update
}