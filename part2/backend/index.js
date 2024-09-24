const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'AxiosError') {
    return response.status(400).json({ error: 'axios si rifiuta amio' })
  }else {console.log('rserse')}

  next(error)
}

app.use(errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})