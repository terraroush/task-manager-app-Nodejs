const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
            throw new Error("Email is invalid!")
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Cannot contain "password"!')
            }
        }

    }
})
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,

    },
    completed: {
        type: Boolean,
        default: false
    },
})

const task = new Task({
    description: 'let chickens out',
    completed: true
})

task.save().then(() => {
    console.log('You created a task!', task)

}).catch((error) => {
    console.log('Error!', error)
})

// const person = new User({
//     name: '  Maru ',
//     email: "maru@maru.com",
//     // password: "password",
//     // password: "hgyjm",
//     // password: "  thisshouldwork  ",
//     password: "thispassword"
// })

// person.save().then(() => {
//     console.log('User saved!', person)

// }).catch((error) => {
//     console.log('User not saved!', error)
// })

