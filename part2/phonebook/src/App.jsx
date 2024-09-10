import { useEffect, useState } from 'react'

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
      <div>
          filter by name <input onChange={filterByName} type="text" />
      </div>
      <br />
      <h3>Add a new person</h3>
      <form>
        <div>
          name: <input id="name" onChange={handleInput} />
        </div>
        <div>
          phone number: <input id="number" onChange={handleInput} />
        </div>
        <div>
          <button type="submit" onClick={handleAddBtn}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { filteredPersons ?
      filteredPersons.map(person => <p key={person.name}>{person.name} - {person.number}</p>) :
      persons.map(person => <p key={person.name}>{person.name} - {person.number}</p>)}
    </div>
  )
}

export default App