const mongoose = require('mongoose')
    //載入todo model
const Todo = require('../todo')
mongoose.connect('mongodb://localhost/todo-list')
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        Todo.create({
            name: 'name-' + i
        })
    }
    console.log('Done.')
})