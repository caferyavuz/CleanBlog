const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const Photo = require('./models/Photo')

mongoose.connect('mongodb://localhost/cleanblog-test-db');

// MIDDLEWARE

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.json())



app.get('/',async(req,res)=>{
    const photos = await Photo.find()
    res.render("index",{
        photos:photos
    })
})

app.get('/index',async(req,res)=>{
    const photos = await Photo.find()
    res.render("index",{
        photos:photos
    })
})

app.get('/about',(req,res)=>{
    res.render("about")
})

app.get('/add_post',(req,res)=>{
    res.render("add_post")
})

app.get('/post',(req,res)=>{
    
    res.render("post")
})

app.get('*',(req,res)=>{
    res.send('<h2> 404 Not Found</h2>')
})

app.post('/addPost',async(req,res)=>{
    await Photo.create(req.body)
    res.redirect("/index")
})

app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda başlatıldı.`)
})