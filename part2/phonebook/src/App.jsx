import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Personform from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filteredPersons, setFilteredPersons] = useState()
  console.log(Boolean(filteredPersons))

  const [newPerson, setNewPerson] = useState({name:"", number:""})
  

  const handleInput = (e) => {
    e.preventDefault()
    setNewPerson(newPerson => ({...newPerson, [e.target.id]: e.target.value}))
  }

  const handleAddBtn = (e) => {
    e.preventDefault()

    if(persons.find(person => person.name === newPerson.name) ? true : false){
      return alert(`${newPerson.name} is already added to phonebook`)
    }

    setPersons([...persons, newPerson])
  }

  const filterByName = (e) => {
    e.preventDefault()

    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  useEffect(()=>{
    console.log(persons)
    console.log(newPerson)
  }, [newPerson])

  return (
    <div>
      <div>debug: {newPerson.name}</div>
      <h2>Phonebook</h2>
        <Filter filterByName={filterByName} />
      <br />
      <h3>Add a new person</h3>
        <Personform handleInput={handleInput} handleAddBtn={handleAddBtn} />
      <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} persons={persons} />
    </div>
  )
}

export default App