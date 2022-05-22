const fs = require('fs');
const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js');
const PostModel = require('../models/post.js')


//return posts 
router.get('/',(request,response)=>{
    PostModel.find({}).populate('author').exec((err,posts)=>{
       if(!err) return response.json(posts)
       else response.status(500).send('DB error')
    })
})

//return specific post 
router.get('/:id',(request,response)=>{
   const {id} = request.params
   PostModel.findById(id).populate('author').exec((err,post)=>{
      if(!err) return response.json(post)
      else response.status(500).send('DB error')
   })
})

//add new post
router.post('/',(request,response)=>{
  const postData = {
      title: request.body.title,
      body: request.body.body,
      author: request.body.author,
  }
  const post = new PostModel(postData)
  post.save((err,result)=>{
      if(!err) return response.json(result)
      else response.status(500).send('DB error')
  })
})
//updating a post 
router.put('/:id',(request,response)=>{
   const {id} = request.params
   PostModel.findByIdAndUpdate(id,
       {title: request.body.title,
       body: request.body.body} ,
       (err,post)=>{
       if(!err) return response.json(post)
       else response.status(500).send('DB error')
    })
})
//updating a pos 
router.delete('/:id',(request,response)=>{
   const {id} = request.params
   PostModel.findByIdAndDelete(id,(err,post)=>{ 
       if(!err) return response.json(post)
       else response.status(500).send('DB error')
    })
})


module.exports = router