/*const http = require('http') //requires module http
const port = process.env.PORT || 5000  //port number from env variables or 5000 
const server = http.createServer() //server created
server.on('request',(request,response) =>{
   debugger
   response.end("Hello World ") // log hello world for any one hit the port 5000
})
server.listen(port,(error)=>{
   if(!error) return console.log('server start at port ${port}')
})*/

//starting ourlab using express
//npm init 
//npm install express
//sudo npm install -g nodemon
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000  //port number from env variables or 7000 
const app = express()//servr created
const userRouter = require('./routes/users.js')
const postRouter = require('./routes/posts.js')

app.use(express.json())
app.use('/users',(req,res,next)=>{
    console.log(`${new Date()} - ${req.method} - ${req.url} `);
    next()
})
app.use('/users',userRouter)//any request on this path /users for ex -> /users/5  use router that comes from folder routes of file users 
app.use('/posts',postRouter)



mongoose.connect('mongodb://127.0.0.1:27017/blog',(err)=>{
    if(!err) console.log('connected successfully')
    else console.log(err)
})
//requests on home index.js page dosnot need routes
app.get('/',(request,response)=>{
    response.send("Home Page buddy")
})
app.listen(PORT,(err)=>{
    if(!err) return console.log(`server start at port ${PORT}`)
       console.log(error)
})