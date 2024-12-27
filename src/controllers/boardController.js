import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/apiError'

const createNew = async (req, res, next) => {
  try {
    // res.status(StatusCodes.CREATED).json({ message: 'Note: API create new boards controller' })
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'GiaLocDev test error')
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}