const Personform = ({handleInput, handleAddBtn}) =>  {
    return (
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
    )
}

export default Personform