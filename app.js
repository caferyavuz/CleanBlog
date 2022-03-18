const express = require('express')
const app = express()
const port = 3000



app.get('/blog/1',(req,res)=>{
    let blog = { id: 1, title: "Blog title", description: "Blog description" }
    res.send(blog)
})

app.get('*',(req,res)=>{
    res.send("Clean Blog")
})

app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda başlatıldı.`)
})