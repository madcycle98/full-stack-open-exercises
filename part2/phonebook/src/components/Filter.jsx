const Filter = ({filterByName}) => {
    return (
        <>
            filter by name <input onChange={filterByName} type="text" />
        </>
    )
}

export default Filter