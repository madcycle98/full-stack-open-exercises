const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))



app.get('/', (request,response) => {
    response.send("<h1>Health check ok</h1>")
})

app.get('/info', (request, response) => {
    const phonebookEntries = persons.length
    response.send(`<h2>Phonebook has ${persons.length} contacts</h2>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
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

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => response.status(204).end())
      .catch(error => next(error))
})

// const generateId = () => {
//     const maxId = persons.length > 0
//       ? Math.max(...persons.map(n => Number(n.id)))
//       : 0
//     return String(maxId + 1)
//   }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

  //   console.log(body)
  // if (!body.name && !body.number) {
  //   return response.status(400).json({ 
  //     error: 'name and number missing' 
  //   })
  // }else if(persons.find(person => person.name === body.name)){
  //   return response.status(400).json({
  //       error:"this person is already in there bruh"
  //   })
  // }

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

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(request.params.id, {name, number}, { new: true, runVaildators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})