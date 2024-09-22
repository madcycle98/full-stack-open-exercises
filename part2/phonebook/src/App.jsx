import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Personform from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import phoneBookService from './services/persons'
import { v4 as uuidv4 } from 'uuid';

const App = () => {


  const [persons, setPersons] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const fetchAllData = () => {
    phoneBookService
    .getAll()
    .then(response => setPersons(response.data))
  }

  useEffect(()=>{
    fetchAllData()
  },[])

  
  const [filteredPersons, setFilteredPersons] = useState()
  
  const [newPerson, setNewPerson] = useState({name:"", number:"", id:uuidv4()})
  
  useEffect(()=>{
    console.log(newPerson);
  },[newPerson])

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

    axios
    phoneBookService
    .create(newPerson)
    .then( setNewPerson({name:"", number:"", id: uuidv4()}))
    .catch(error => {
      console.log(error)
      setErrorMessage(error.response.data.error)
    })
  }

  const deletePerson = (id) => {
    phoneBookService.deletePerson(id)
    setPersons(persons.filter(person => person.id !== id))
  }

  const filterByName = (e) => {
    e.preventDefault()

    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div>
      <div>{errorMessage ? <h2>{errorMessage}</h2> : null }</div>
      <h2>Phonebook</h2>
        <Filter filterByName={filterByName} />
      <br />
      <h3>Add a new person</h3>
        <Personform handleInput={handleInput} handleAddBtn={handleAddBtn} newPerson={newPerson} />
      <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App