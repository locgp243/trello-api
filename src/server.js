/* eslint-disable no-unused-vars */


import express from 'express'
import { CONNTECT_DB, GET_DB, CLOSE_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  app.use('/v1', APIs_V1)
  // app.get('/', async (req, res) => {
  //   // Test Absolute import mapOrder
  //   console.log(await GET_DB().listCollections().toArray())
  //   res.end('<h1>Hello World!</h1><hr>')
  // })

  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    console.log('exit app')
    CLOSE_DB()
  })

}

CONNTECT_DB()
  .then(() => console.log('connected to MongoDB Cloud'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })

