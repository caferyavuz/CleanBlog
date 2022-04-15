const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const Post = require('./models/Post')

mongoose.connect('mongodb://localhost/cleanblog-test-db');

// MIDDLEWARE

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.json())



app.get('/',async(req,res)=>{
    const posts = await Post.find()
    res.render("index",{
        posts:posts
    })
})

app.get('/index',async(req,res)=>{
    const posts = await Post.find()
    res.render("index",{
        posts:posts
    })
})

app.get('/about',(req,res)=>{
    res.render("about")
})

app.get('/add_post',(req,res)=>{
    res.render("add_post")
})

app.get('/post/:id', async(req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render("post",{
        post:post
    })
})

app.get('*',(req,res)=>{
    res.send('<h2> 404 Not Found</h2>')
})

app.post('/addPost',async(req,res)=>{
    await Post.create(req.body)
    res.redirect("/index")
})

app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda başlatıldı.`)
})