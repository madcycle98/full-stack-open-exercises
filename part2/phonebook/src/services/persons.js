import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    return axios
    .get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}` )
}

// const updateNumber = (name) => {

// }

export default {getAll, create, deletePerson}