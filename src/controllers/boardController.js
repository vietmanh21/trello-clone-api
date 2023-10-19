import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu về phía service
    const result = await boardService.createNew(req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

const getBoardById = async (req, res, next) => {
  try {
    const { id } = req.params
    // Điều hướng dữ liệu về phía service
    const result = await boardService.getBoardById(id)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

export const boardController = {
  createNew, getBoardById
}