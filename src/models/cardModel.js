import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { GET_DB } from '~/config/mongodb'

const cardCollectionName = 'card'
const cardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  cover: Joi.string().default(null),
  description: Joi.string().default(null),
  memberId: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
  // sẽ không xoá ngay ko chỉ ko hiện lên cho phía cilent thấy
})

const validateSchema = async(data) => {
  await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async(data) => {
  try {
    const validValues = await validateSchema(data)

    const cardCollection = await GET_DB().collection(cardCollectionName).insertOne(validValues)
    console.log(cardCollection)
  } catch (error) {
    new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
  } 
}

const update = async(data) => {
  try {
    const validValues = await validateSchema(data)

    const cardCollection = await GET_DB().collection(cardCollectionName).insertOne(validValues)
  } catch (error) {
    new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
  }
}

export const cardModel = {
  createNew
}