const express = require('express')
const app = express()

const tasksRouter = require('./routes/tasks')
const bodyParser = require("body-parser");

const connect = require('./db/connect')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1/tasks', tasksRouter)



const port = 3000

const startServer = async () => {
    try {
        await connect();
        console.log('connected to DB')
        app.listen(port, () => console.log('server running on port 3000'))
    } catch (e) {
        console.log(`Error : ${e}`)
    }
}
startServer();

