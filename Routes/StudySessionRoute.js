const express = require("express");
const router = express.Router();
const {createSession,getSession,getSortedSession,registerForSession,getSessionsOfUser} = require("../Methods/StudySessionMethod")

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

router.get("/getSession", async(req,res)=>{
    try {
        const response = await getSession()
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.get("/getSortedSession", async(req,res)=>{
    try {
        const response = await getSortedSession(req.query.order)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.put("/registerForSession", async(req,res)=>{
    try {
        const response = await registerForSession(req.body.id,req.body.email,req.body.userName)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


router.get("/getSessionsOfUser", async(req,res)=>{
    try {
        const response = await getSessionsOfUser(req.query.email)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
 