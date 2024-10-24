const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

mongoose.connect(url)
  .then(result => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB: ', err.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 6,
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)