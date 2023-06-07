const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send('App running fine.')
})

const contact = require('./src/routes/contactRoute')

app.use('/contact', contact)

app.listen(process.env.PORT, () => {
    console.log(`Portfolio Backend running on ${process.env.PORT}`)
})