const Persons = ({filteredPersons, persons, deletePerson}) => {
    return (
        <>
            { (filteredPersons ? filteredPersons : persons).map(person => (
            <li key={person.id}>
                    {person.name} - {person.number} - 
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </li>
        ))
            }
        </>

    )
}

export default Persons