const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '94f1c594ee7142378e4f17c01944e775',
    captureUncaught: true,
    capttureUnhandledRejections: true
})

const students = []
const app = express()

app.use(rollbar.errorHandler())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info("html file served successfully")
})

app.post('/api/student', (req, res) => {
    const {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student added successfully', {author: 'Austin', 
    type: 'manual entry'})
    res.status(200).send(students)
})

const port = process.env.PORT || 4000


app.listen(port, () => console.log(`Listening on port ${port}`))