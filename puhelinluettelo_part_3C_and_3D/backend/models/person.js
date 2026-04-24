import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { personSchema } from '../utils/personSchema.js'
dotenv.config({ path: './.env' });

/* persistent database connection */
let isConnected = false


/* connect to the database */
async function connectToDatabase() {
    if (isConnected) {
        return
    }
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 })
        isConnected = true
        console.log('connected to MongoDB')
    } catch (error) {
        console.error('error connecting to MongoDB:', error.message)
        throw error
    }
}


/* function save a person to the database */
export async function createPerson(person) {
    await connectToDatabase()
    
    try {
        const result = await mongoose.model('Person', personSchema).create({
            name: person.name,
            number: person.number
        })
        return result
    } catch (error) {
        console.error('error saving person:', error.message)
        throw error
    }
}


/* find all persons in the database */
export async function readAllPersons() {
    await connectToDatabase()

    try {
        let result = await mongoose.model('Person', personSchema).find({})
        return result
    } catch (error) {
        console.error('error fetching persons:', error.message);
        throw error
    }
}


/* find a person by id */
export async function getPersonById(id) {
    await connectToDatabase()

    try {
        let result = await mongoose.model('Person', personSchema).findById(id)
        return result
    } catch (error) {
        console.error('error fetching person:', error.message);
        throw error
    }
}


/* function update a person in the database */
export async function updatePerson(id, updatedPerson) {
    await connectToDatabase()

    try {
        const result = await mongoose.model('Person', personSchema).findByIdAndUpdate(id, {
            name: updatedPerson.name,
            number: updatedPerson.number
        }, { new: true })
        return result
    } catch (error) {
        console.error('error updating person:', error.message)
        throw error
    }
}


/* function delete a person in the database */
export async function deletePersonById(id) {
    await connectToDatabase()

    try {
        const result = await mongoose.model('Person', personSchema).findByIdAndDelete(id)
        return result
    } catch (error) {
        console.error('error deleting person:', error.message)
        throw error
    }
}