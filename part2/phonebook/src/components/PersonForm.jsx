const Personform = ({handleInput, handleAddBtn, newPerson}) =>  {
    return (
        <form>
            <div>
            name: <input id="name" onChange={handleInput} value={newPerson.name} />
            </div>
            <div>
            phone number: <input id="number" onChange={handleInput} value={newPerson.number} />
            </div>
            <div>
            <button type="submit" onClick={handleAddBtn}>add</button>
            </div>
        </form>
    )
}

export default Personform