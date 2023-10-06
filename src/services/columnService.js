import { slugify } from '~/utils/formatters'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // xử lý logic dữ liệu
    const newColumn = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const result = await columnModel.createNew(newColumn)
    //Trả kết quả về, trong service luôn phải có return
    return result
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