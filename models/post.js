const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
       title: { type: String},
       body: { type: String},
       author: { type: mongoose.Schema.Types.ObjectId, ref:'user'},
      
    }
)

const PostModel = mongoose.model('post',PostSchema)
module.exports  = PostModel 