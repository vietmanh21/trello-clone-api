import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(250).trim().strict().messages({
      'any.required': 'Title is required (ManhNguyen)',
      'string.empty': 'Title is not allowed to be empty (ManhNguyen)',
      'string.min': 'Title length must be at least 3 characters long (ManhNguyen)',
      'string.max': 'Title length must be less then or equal to 50 characters long (ManhNguyen)',
      'string.trim': 'Title must not have leading or trailing spaces (ManhNguyen)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Description is required (ManhNguyen)',
      'string.empty': 'Description is not allowed to be empty (ManhNguyen)',
      'string.min': 'Description length must be at least 3 characters long (ManhNguyen)',
      'string.max': 'Description length must be less then or equal to 256 characters long (ManhNguyen)',
      'string.trim': 'Description must not have leading or trailing spaces (ManhNguyen)'
    })
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    columnOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew, update
}