const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const Todo = require('./models/todo') //載入todo model

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

app.get('/', (req, res) => {
    Todo.find() //取出Todo model所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(todos => res.render('index', { todos })) //將資料傳給index樣板
        .catch(error => console.log(error)) //錯誤處理

})

app.listen(3000, () => {
    console.log('app is ruuning on locoal host 3000')
})