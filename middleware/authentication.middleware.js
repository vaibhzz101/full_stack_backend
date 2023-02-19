const jwt=require("jsonwebtoken")
const authenticate = (req,res,next)=>{
const token=req.headers.authorization
if(token){
jwt.verify(token, "masai",(err,decoded)=>{
    if(decoded){
        const userID= decoded.userID
        req.body.user=userID 
        console.log(decoded)
        next()
    }else {
        res.send({"msg": "Please Login","error":err.message})
    }
})

} else {
    res.send({"msg": "Please Login"})
}
}
module.exports={
authenticate
}