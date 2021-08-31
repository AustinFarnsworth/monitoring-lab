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
app.use(express.json())
app.use('/style', express.static('./public/styles.css'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info("html file served successfully")
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Austin'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.log('No name giver')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.log('Student already added')
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4000


app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Listening on port ${port}`))