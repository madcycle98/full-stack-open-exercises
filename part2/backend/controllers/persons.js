const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request,response) => {
  response.send('<h1>Health check ok</h1>')
})

personsRouter.get('/info', (request, response) => {
  response.send(`<h2>Phonebook has ${persons.length} contacts</h2>`)
})

personsRouter.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

personsRouter.post('/api/persons', (request, response, next) => {
  const body = request.body
  if(body.name === undefined){
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

personsRouter.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runVaildators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter