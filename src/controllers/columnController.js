import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {    
    // Điều hướng dữ liệu về phía service
    const createdColumn = await columnService.createNew(req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params
    // Điều hướng dữ liệu về phía service
    const updateColumn = await columnService.update(id, req.body)
    // Có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json(updateColumn)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

export const columnController = {
  createNew, update
}