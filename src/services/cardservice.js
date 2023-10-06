import { slugify } from '~/utils/formatters'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    // xử lý logic dữ liệu
    const newCard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const result = await cardModel.createNew(newCard)
    //Trả kết quả về, trong service luôn phải có return
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, reqBody) => {
  try {
    // xử lý logic dữ liệu
    const updateCard = {
      // lấy toàn bộ data
      ...reqBody,
      updateAt: Date.now()
    }
    //Gói tới tầng model để xử lý lưu bản ghi newBoard vaò DB
    const result = await cardModel.update(id, updateCard)
    //Trả kết quả về, trong service luôn phải có return
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const cardService = {
  createNew, update
}