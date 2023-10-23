import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu về phía service
    const createdBoard = await boardService.createNew(req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const { id } = req.params
    // Điều hướng dữ liệu về phía service
    const updateBoard = await boardService.update(id, req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.CREATED).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  update,
  getDetails
}