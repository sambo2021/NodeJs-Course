const fs = require('fs');
const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js');


/*
function existingTodosParsed(){
    if(!fs.existsSync('./database/db.json')){
        fs.writeFileSync('./database/db.json',JSON.stringify([])) //create a file with empty array
    }
    const todos = fs.readFileSync('./database/db.json','utf-8') //json format needs to be barsed to js object
     return JSON.parse(todos) // now it is javascript array of objects
}
//get all opjects
router.get('/',(request,response)=>{
    const todosParsed = existingTodosParsed();
    response.json(todosParsed)
})
//returned opjects of status checked
router.get('/checked',(request,response)=>{
    const todosParsed = existingTodosParsed();
    const todosParsedChecked = todosParsed.filter(x=>x.checked==true)
    response.json(todosParsedChecked)
})
//returned opjects of status unchecked
router.get('/unchecked',(request,response)=>{
    const todosParsed = existingTodosParsed();
    const todosParsedChecked = todosParsed.filter(x=>x.checked==false)
    response.json(todosParsedChecked) 
})
//returned specified poject
router.get('/:id',(request,response)=>{
    const {id} = request.params
    const todosParsed = existingTodosParsed();
    const todosParsedChecked = todosParsed.filter(x=>x.id==id)
    response.json(todosParsedChecked)
})
//add new object
router.post('/',(request,response)=>{
    //to recieve data sent from postman
    const userBody = request.body
    const todosParsed = existingTodosParsed();
    if(todosParsed.length==0) id=1 
    else id = todosParsed[todosParsed.length-1].id +1 
    const newTodo = {
        id: id,
        title: request.body.title,
        body: request.body.body,
        checked: false,
    }
    todosParsed.push(newTodo);
    fs.writeFileSync('./database/db.json',JSON.stringify(todosParsed));
})
//edit an existing object
router.put('/:id',(request,response)=>{
    const {id} = request.params
    const todosParsed = existingTodosParsed();
    const edited = todosParsed.map(e => {
        if(e.id == id)
           e.body = request.body.body
           e.title= request.body.title
        return e
     })
     fs.writeFileSync('./database/db.json',JSON.stringify(edited));
})
//delete an object
router.delete('/:id',(request,response)=>{
    const {id} = request.params
    const todosParsed = existingTodosParsed(); 
    const afterDel = todosParsed.filter(e => e.id != id)
    fs.writeFileSync('./database/db.json',JSON.stringify(afterDel));
})
//check
router.put('/check/:id',(request,response)=>{
    const {id} = request.params
    const todosParsed = existingTodosParsed();
    const edited = todosParsed.map(e => {
        if(e.id == id)
           e.checked=true
        return e
     })
     fs.writeFileSync('./database/db.json',JSON.stringify(edited));
})
router.put('/uncheck/:id',(request,response)=>{
    const {id} = request.params
    const todosParsed = existingTodosParsed();
    const edited = todosParsed.map(e => {
        if(e.id == id)
           e.checked=false
        return e
     })
     fs.writeFileSync('./database/db.json',JSON.stringify(edited));
})
*/
//---------------------------------------------------------------------------

//return users 
router.get('/',(request,response)=>{
     UserModel.find({},(err,users)=>{
        if(!err) return response.json(users)
        else response.status(500).send('DB error')
     })
 })

 //return specific user 
router.get('/:id',(request,response)=>{
    const {id} = request.params
    UserModel.findById(id,(err,user)=>{
       if(!err) return response.json(user)
       else response.status(500).send('DB error')
    })
})

//add new object
router.post('/',(request,response)=>{
   const userData = {
       firstName: request.body.firstName,
       lastName: request.body.lastName,
       email: request.body.email,
       dateBirth: new Date()
   }
   const user = new UserModel(userData)
   user.save((err,result)=>{
       if(!err) return response.json(result)
       else response.status(500).send('DB error')
   })
})
//updating a user 
router.put('/:id',(request,response)=>{
    const {id} = request.params
    UserModel.findByIdAndUpdate(id,
        {firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email} ,
        (err,user)=>{
        if(!err) return response.json(user)
        else response.status(500).send('DB error')
     })
 })
 //updating a user 
router.delete('/:id',(request,response)=>{
    const {id} = request.params
    UserModel.findByIdAndDelete(id,(err,user)=>{ 
        if(!err) return response.json(user)
        else response.status(500).send('DB error')
     })
 })


module.exports = router