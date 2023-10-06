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
    const result = await boardModel.createNew(newBoard)
    //Trả kết quả về, trong sẻvice luôn phải có return
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew
}