import axios from "axios"

const baseUrl = '/api/persons/'

/*
Feed person creation
*/
const setNewPerson = (name, number) => {
    const personObject = { name, number }
    return axios.post(baseUrl, personObject).then((response) => response.data)
}   
     
/* Get all persons from the database */
const getAllPersons = () => axios.get(baseUrl).then((response) => response.data)

/* Update person by id */
const updatePersonById = (changedPerson) => {
    return axios.put(`${baseUrl}${changedPerson.id}`, changedPerson).then((response) => response.data)
}

/* Delete person by id */
const deletePersonById = (personId) => {
    return axios.delete(`${baseUrl}${personId}`)
}


export default { setNewPerson, getAllPersons, updatePersonById, deletePersonById }