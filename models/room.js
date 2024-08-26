const  mongoose  = require("mongoose")

const roomSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxcount:{
        type:Number,
        required:true
    },
    phoneNumber:
    {
        type:Number,
        required:true
    },
    rent:
    {
        type:Number,
        required:true
    },
    imageUrls:[],
    currentBookings :[],
    type:
    {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    
})


const Room = mongoose.model('Room', roomSchema);

module.exports = Room;