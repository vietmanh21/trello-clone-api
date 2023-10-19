/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

const getBoardById = async (boardId) => {
  try {
    // xử lý logic dữ liệu
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const board = await boardModel.getBoardById(boardId)

    if (board === undefined) {
      throw new Error('No board data')
    }
    //Trả kết quả về, trong sẻvice luôn phải có return
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
    })
    delete board.cards
    console.log(board)
    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew, getBoardById
}