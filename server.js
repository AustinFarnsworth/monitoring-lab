const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '94f1c594ee7142378e4f17c01944e775',
    captureUncaught: true,
    capttureUnhandledRejections: true
})

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info("html file served successfully")
})

const port = process.env.PORT || 4000


app.listen(port, () => console.log(`Listening on port ${port}`))