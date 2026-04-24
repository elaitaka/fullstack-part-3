import express, { json } from 'express'
import morgan from 'morgan'

import { createPerson, readAllPersons, updatePerson, getPersonById, deletePersonById } from './models/person.js'


const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('dist'))
//app.use(cors())

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :body'))
//app.use(morgan('tiny'))

app.use(json())


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

/* function add a new person */
app.post('/api/persons', async (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    try {
        const createdPerson = await createPerson(person)
        response.json(createdPerson)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})


/* function update a person with given id */
app.put('/api/persons/:id', async (request, response, next) => {
    const body = request.body

    const person = {
        name: request.body.name,
        number: request.body.number,
        id: request.params.id
    }

    try {
        const updatedPerson = await updatePerson(request.params.id, person)
        if (updatedPerson) {
            response.json(updatedPerson)
        } else {
            response.status(404).json({ error: 'Person not found' })
        }
    } catch (error) {
        next(error)
    }
})


/* function get all persons */
app.get('/api/persons', async (request, response) => {
    response.json(await readAllPersons())
})


/* function get a person with given id */
app.get('/api/persons/:id', async (request, response) => {
    try {
        const person = await getPersonById(request.params.id)
        if (person) {
            response.json(person)
        } else {
            response.status(404).json({ error: 'Person not found' })
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})


/* function send phonbook's info and current date */
app.get('/api/info', async (request, response) => {
    try {
        const persons = await readAllPersons()
        response.send(`<p>Phonebook has ${persons.length} people</p>
                    <p>${new Date()}</p>`)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})


/* function delete a person with given id */
app.delete('/api/persons/:id', async (request, response, next) => {
    try {
        await deletePersonById(request.params.id)
            .then(result => {
                response.status(204).end()
            })
    } catch (error) {
        next(error)
    }
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)
app.use(errorHandler)

/* function start server */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app