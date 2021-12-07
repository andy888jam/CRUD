const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/todo-list')

const db = mongoose.connection

db.on('error', () => {
    console.log('Mongodb error!')
})
db.once('open', () => {
    console.log('Mongodb connected!')
})

app.get('/', (req, res) => {
    res.send('hello, world!')
})

app.listen(3000, () => {
    console.log('app is ruuning on locoal host 3000')
})