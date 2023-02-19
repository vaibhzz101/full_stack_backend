const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: String,
    email:String,
    pass: String,
    gender: String,
    age:Number

})
const UserModel=mongoose.model("user", userSchema)

module.exports={
    UserModel
}