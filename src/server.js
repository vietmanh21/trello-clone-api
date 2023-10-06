/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()
  
  // enable req.body json data
  app.use(express.json())

  // Use APIs V1
  app.use('/v1', APIs_V1)

  // middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
    console.log(`Hello ${ env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  // thuc hien cac tac vu cleanup truoc khi dung server
  exitHook(() => {
    CLOSE_DB()
  })
}

// Chi khi ket noi DB thanh cong moi start server back-end len
// (IIFE) Anonymous Async function
(async () => {
  try {
    console.log('Connected to mongodb Atlas')
    await CONNECT_DB()
    START_SERVER()
  }  catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// // Chi khi ket noi DB thanh cong moi start server back-end len
// CONNECT_DB()
//   .then(() => {
//     console.log('Connected to mongodb Atlas')
//     })
//     .then(() => {
//       START_SERVER()
//     })
//     .catch(err => {
//       console.error(err)
//     })