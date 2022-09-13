const express = require("express");
const router = express.Router();
const {createSession,getSession,getSortedSession,registerForSession,getSessionsOfUser} = require("../Methods/StudySessionMethod")


// API to create a new study session
router.post("/createSession", async(req,res)=>{
    try {
        const response = await createSession(req.body.title,req.body.subject,
                                             req.body.startTime,req.body.endTime,
                                             req.body.maxStudents,req.body.postedByEmail)
                                             
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})
// API to get all sessions
router.get("/getSession", async(req,res)=>{
    try {
        const response = await getSession()
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

// API to get sessions after sorting by start date
router.get("/getSortedSession", async(req,res)=>{
    try {
        const response = await getSortedSession(req.query.order)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

// API to register for a session
router.put("/registerForSession", async(req,res)=>{
    try {
        const response = await registerForSession(req.body.id,req.body.email,req.body.userName)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

// API to get sessions of a perticular user
router.get("/getSessionsOfUser", async(req,res)=>{
    try {
        const response = await getSessionsOfUser(req.query.email)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
 