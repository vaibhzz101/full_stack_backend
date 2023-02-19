const express = require("express")
const { NoteModel } = require("../model/note.model")




const notesRouter = express.Router()
//for all the following things authentication is required.
notesRouter.get("/",async(req, res) => {
    const notes = await NoteModel.find()
    res.send(notes)
})
notesRouter.post("/create", async (req, res) => {
    const payload = req.body
    const new_note = new NoteModel(payload)
    await new_note.save()
    res.send({ "msg": "Note Created" })
})
notesRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const ID = req.params.id
    const note = await NoteModel.findOne({_id:id})
    const userID_in_note = note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_making_req !== userID_in_note){
           res.send({"msg":"You are not authorised"})
        }
        else{
            await NoteModel.findByIdAndUpdate({_id:ID }, payload)
            res.send({ "msg": "updated the note" })
        }
    }
    catch (err) {
        res.send({ "msg": "not update something went wrong", "error": err.message })
    }

})
notesRouter.delete("/delete/:id", async (req, res) => {

    const ID= req.params.id
    try {
        await NoteModel.findByIdAndDelete({_id:ID})
        res.send({ "msg": "deleted the note" })
    }
    catch (err) {
        res.send({ "msg": "not delete something went wrong", "error": err.message })
    }
})
module.exports = {
    notesRouter
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXVyc2UiOiJiYWNrZW5kIiwiaWF0IjoxNjc2NTc3ODIyfQ.VIYHYGG4OREU2_EDeyVTDriBlrSht9aGQa83vZnpY1w

// {
//     "email":"vashevne@gmail.com",
//     "pass":"1234"
//     }