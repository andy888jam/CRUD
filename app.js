const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
    // 建立名為hbs的樣版引擎，並設定express的相關參數
app.engine('hbs', exphbs({
        defaultLayout: 'main',
        //指定副檔名
        extname: '.hbs'
    }))
    //啟用樣版引擎hbs
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/todo-list')

const db = mongoose.connection

db.on('error', () => {
    console.log('Mongodb error!')
})
db.once('open', () => {
    console.log('Mongodb connected!')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('app is ruuning on locoal host 3000')
})