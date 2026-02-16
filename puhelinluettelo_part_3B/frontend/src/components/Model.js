import axios from "axios"

//const baseUrl = 'http://localhost:3001/persons/'
const baseUrl = 'http://localhost:3001/api/persons/'


const getAll = () => axios.get(baseUrl).then((response) => response.data)

const createNewPerson = (name, number) => {
    const personObject = { name, number }
    return axios.post(baseUrl, personObject).then((response) => response.data)
}

const updatePersonById = (changedPerson) => {
    return axios.put(`${baseUrl}${changedPerson.id}`, changedPerson).then((response) => response.data)
}

const deletePersonById = (personId) => {
    return axios.delete(baseUrl + personId)
}

export default { getAll, createNewPerson, deletePersonById, updatePersonById }