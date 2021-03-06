require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// variables
const PORT = process.env.PORT

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for  requests
    app.listen(PORT, () => {
        console.log('connected to DB & Listening on port ', PORT)
    })
})
.catch( err => console.log(err) )

