const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postControllers = require('./controllers/postControllers')
const pageControllers = require('./controllers/pageControllers')


const app = express()
const port = 3000


mongoose.connect('mongodb://localhost/cleanblog-test-db');

// MIDDLEWARE

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.json())
app.use(methodOverride('_method',{
    methods:['GET','POST']
}))


app.get('/',postControllers.getAllPost)
app.get('/index',postControllers.getAllPost)
app.get('/post/:id',postControllers.getPost)
app.delete('/post/:id',postControllers.deletePost )
app.post('/addPost', postControllers.createPost)
app.put('/edit_post/:id', postControllers.updatePost )

app.get('/about', pageControllers.aboutPage)
app.get('/add_post', pageControllers.addPostPage)
app.get('/edit_post/:id', pageControllers.editPostPage)
app.get('*',pageControllers.otherPage)


app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda başlatıldı.`)
})