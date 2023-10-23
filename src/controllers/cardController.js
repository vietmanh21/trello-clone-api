import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu về phía service
    const createdCard = await cardService.createNew(req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params
    // Điều hướng dữ liệu về phía service
    const updateCard = await cardService.update(id, req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(updateCard)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createNew, update
}