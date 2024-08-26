const express=require("express");
const router=express.Router();
const User=require('../models/user')

router.post('/registeruser',async(req,res)=>{
    
    const newuser=new User({firstName :req.body.firstName , lastName :req.body.lastName,email:req.body.email,password:req.body.password})
    try{
        const user=await newuser.save()
        
        res.send(user)
    }
    catch(error){
        return res.status(400).json({message: error})
    }
});
router.post('/login',async(req,res)=>{
  const {email, password} =req.body
  try{
    const user= await User.findOne({email:email,password:password})
    if(user)
    {
        res.send(user)
    }
    else{
        res.send(null)
        
    }
  }
  catch(error)
  {
    return res.status(400).json({message: error})
  }
});
module.exports=router;