
const express = require("express")
const {connection}= require("./config/db")

const {authenticate}=require("./middleware/authentication.middleware")
const {userRouter} = require("./routes/user.router")
const { notesRouter } = require("./routes/notes.router")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send("Home page")
})
app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", notesRouter )



app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connected to db")

    }
    catch(error){
        console.log("cannot connect to db")
        console.log(error)

    }
    console.log(`Running the server at port 8040`)
})