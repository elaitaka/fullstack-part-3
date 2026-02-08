import express, { json } from 'express'

import {persons} from './utils/data.js'


const app = express()
const PORT = 3001

app.use(json())



const personss = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '040-123456',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '040-123456',
    id: 4
  }
]




function generateId() {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
} 

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})