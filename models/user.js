const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
       firstName: { type: String, required: true, minLength: 3 },
       lastName: { type: String, required: true, minLength:  3},
       email: { type: String, unique: true, match: /.+@.+\..+/ },
       dateBirth: {type: Date}
    }
)


//define static method of UserModel can get Fullname
UserSchema.statics.getUserByFullName = function(fullName,cb){
    const [firstName, lasName] = fullName.split(' ')
    this.find({firstName, lastName},cb)
}

//define user schema 
UserSchema.methods.getUserByFullName = function(){
    return this.firstName+" "+lastName
}
const UserModel = mongoose.model('user',UserSchema)
module.exports  = UserModel 