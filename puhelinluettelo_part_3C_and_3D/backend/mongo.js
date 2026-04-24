//const mongoose = require('mongoose')
/*
import mongoose from 'mongoose'

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.gxisbwg.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

/* function save a person to the database 
function savePerson(person) {
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}


/* find all persons from the database and print them to the console 
function findAllPersons() {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}


/* create a new person and save it to the database 
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: 1 + Math.floor(Math.random() * 100),
    })
    savePerson(person)
}
else if (process.argv.length === 3) {
    console.log('phonebook:')
    findAllPersons()
}
else {
    console.log('invalid number of arguments')
    process.exit(1)
}
    */