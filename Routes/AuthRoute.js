const express = require("express");
const router = express.Router();
const {signup,login,decryptJWT} = require("../Methods/AuthMethod")

// API to sign up a new user
router.post("/signup", async(req,res)=>{
    try {
        const response = await signup(req.body.email,req.headers.password,req.body.userName)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

// API to login 
router.get("/login", async(req,res)=>{
    try {
        const response = await login(req.query.email,req.headers.password)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

// API to decrypt AccessToken sent from frontend
router.post("/decryptJWT", async(req,res)=>{
    try {
        const response = await decryptJWT(req.body.accessToken)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
 