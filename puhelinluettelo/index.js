import express, { json } from 'express'
import morgan from 'morgan'

import { persons } from './utils/data.js'

const app = express()
const PORT = 3001

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :body'))
//app.use(morgan('tiny'))

app.use(json())

/* function generate a new id for a person */
function generateId() {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

/* function check if name or number already exists in the phonebook */
function nameExists(name) {
    return persons.find(person => person.name === name)
}

/* function check if name or number already exists in the phonebook */
function numberExists(number) {
    return persons.find(person => person.number === number)
}

/* function get all persons */
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

/* function send a person with given id */
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


/* function send phonbook's info and current date */
app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has ${persons.length} people</p>
                <p>${new Date()}</p>`)
})


/* function delete a person with given id */
app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        persons.splice(persons.indexOf(person), 1)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})


/* function add a new person */
app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (nameExists(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    if (numberExists(body.number)) {
        return response.status(400).json({
            error: 'number must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons.push(person)
    response.json(person)

})


/* function start server */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})