const  mongoose  = require("mongoose")
const userSchema =mongoose.Schema({
    firstName:{
        type:String,
        required:true
    }
    ,
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmid:{
        type:Boolean,
        default:false
    }
    
})
const userModel =mongoose.model('users',userSchema)
module.exports=userModel