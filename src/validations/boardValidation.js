import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title must have at least 3 characters',
      'string.max': 'Title must not exceed 50 characters',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    console.log('res body: ', req.body)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate xong thì sang controller
    next()
    
    res.status(StatusCodes.CREATED).json({ message: 'Note: API create new boards validation' })

  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}