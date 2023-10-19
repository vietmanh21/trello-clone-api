import { slugify } from '~/utils/formatters'
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { string } from 'joi'

const createNew = async (reqBody) => {
  try {
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const newColumn = await columnModel.createNew(reqBody)

    // update columnOrder Array in board collection
    // console.log(typeof reqBody.boardId.toString())
    await boardModel.pushColumnOrder(reqBody.boardId.toString(), newColumn.insertedId.toString())
    console.log(newColumn)

    //Trả kết quả về, trong service luôn phải có return
    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, reqBody) => {
  try {
    // xử lý logic dữ liệu
    const updateColumn = {
      // lấy toàn bộ data
      ...reqBody,
      updateAt: Date.now()
    }
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const result = await columnModel.update(id, updateColumn)
    //Trả kết quả về, trong service luôn phải có return
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const columnService = {
  createNew, update
}