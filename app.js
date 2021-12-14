const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const Todo = require('./models/todo') //載入todo model
const bodyParser = require('body-parser')
const todo = require('./models/todo')

// 建立名為hbs的樣版引擎，並設定express的相關參數
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs' //指定副檔名
}))
app.set('view engine', 'hbs') //啟用樣版引擎hbs

mongoose.connect('mongodb://localhost/todo-list')

const db = mongoose.connection

db.on('error', () => {
    console.log('Mongodb error!')
})

db.once('open', () => {
    console.log('Mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    Todo.find() //取出Todo model所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(todos => res.render('index', { todos })) //將資料傳給index樣板
        .catch(error => console.log(error)) //錯誤處理
})

app.get('/todos/new', (req, res) => {
    return res.render('new')
})

app.post('/todos', (req, res) => {
    const name = req.body.name
    return Todo.create({ name })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then((todo) => res.render('detail', { todo }))
        .catch((error => console.log(error)))
})

app.get('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then((todo) => res.render('edit', { todo }))
        .catch((error => console.log(error)))
})

app.post('/todos/:id/edit', (req, res) => {
    //id 和 name 兩種資料都來自客戶端，id 要從網址上用 req.params.id 拿下來，而 name 要用 req.body.name 從表單拿出來
    const id = req.params.id
    const name = req.body.name

    //需要等待資料庫返回執行結果，才能進行下一個動作，所以這裡有兩段的 .then()
    return Todo.findById(id)
        .then(todo => {
            todo.name = name
            return todo.save() //因操作單一資料所以用save而非create
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

app.listen(3000, () => {
    console.log('app is ruuning on locoal host 3000')
})