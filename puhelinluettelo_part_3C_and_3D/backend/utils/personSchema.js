import mongoose from 'mongoose'

/* define the schema for a person */
const personSchema = new mongoose.Schema({
    // Name is obligatory and it checked into frontend-side too. It must unique (no two persons can have the same name).
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },

    // Addional type defination. Phonenumber's format is not checked backend (this is done frontend), but it must be at least 8 characters long.
    number: {
        type: String,
        //minlength: 8,
        required: true
    }
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})


export { personSchema }