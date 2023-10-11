import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')

  .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
  .get(boardController.getBoardById)

export const boardRoute = Router