/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'

const createNew = async (reqBody) => {
  try {
    // xử lý logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    //Trả kết quả về, trong sẻvice luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const update = async (id, reqBody) => {
  try {
    // xử lý logic dữ liệu
    const updateBoard = {
      // lấy toàn bộ data
      ...reqBody,
      updatedAt: Date.now()
    }
    
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const result = await boardModel.update(id, updateBoard)
    
    //Trả kết quả về, trong service luôn phải có return
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    //const tranformBoard

    // add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
    })
    delete board.cards
    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew,
  update,
  getDetails
}