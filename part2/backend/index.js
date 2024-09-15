const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Daniel Ricciardo",
        "number": "12-43-4324324",
        "id": "4"
      },
      {
        "name": "Landor anoriasdf",
        "number": "12-43-4324324",
        "id": "5"
      }
    ]
  
app.get('/', (request,response) => {
    response.send("<h1>Health check ok</h1>")
})

app.get('/info', (request, response) => {
    const phonebookEntries = persons.length
    response.send(`<h2>Phonebook has ${persons.length} contacts</h2>`)
})

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if(person){
        response.send(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(body)
  if (!body.name && !body.number) {
    return response.status(400).json({ 
      error: 'name and number missing' 
    })
  }else if(persons.find(person => person.name === body.name)){
    return response.status(400).json({
        error:"this person is already in there bruh"
    })
  }


  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

    persons = persons.concat(person)
    console.log(persons)
    response.json(person)
})



const PORT = process.env.PORT || 3003

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})