const express = require("express")
const {UserModel} = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter=express.Router()

userRouter.get("/",async(req, res) => {
    const users = await UserModel.find()
    res.send(users)
})

userRouter.post("/register", async(req,res)=>{
    const {name,email,pass,age}= req.body
    try{
        bcrypt.hash(pass, 5, async(err,hash)=>{
            const user = new UserModel({name,email,pass:hash,age})
            await user.save()
            res.send({msg:"user Registerd"})
        })
       
    }
    catch(err){

        res.send({msg:"user not Registerd","error":err.message})
    }
  
    
})
userRouter.post("/login", async(req,res)=>{
    const {email,pass}=req.body
    try{
const user = await UserModel.find({email})

if(user.length>0){
    bcrypt.compare(pass, user[0].pass, (err, result)=>{
        if(result){
            const token = jwt.sign({userID:user[0]._id}, 'masai')
            res.send({"msg":"login success", "token":token})
        }
        else{
            res.send({"msg":"wrong credentials"})
        }
    });
   
} else {
    res.send({"msg":"wrong credentials"})
}

    }
    catch(err){
        res.send({"msg":"something wrong", "error":err.message
    })

    }
    
})

module.exports={
    userRouter
}