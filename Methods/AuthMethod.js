const Auth = require("../Models/Auth")
const bcrypt = require("bcrypt")
const verifyJWT = require("../JWT/decrypt")
const generateJWT = require("../JWT/generate")


const signup = async(email,password,userName) =>{
    let response = {}
    try {

        const hashpass = await bcrypt.hash(password, 10);

        const auth = await new Auth({email,password:hashpass,userName})
        const data = await auth.save()
        
        if (data) {
            const accessToken = generateJWT({ email, userName  })

            response.status = 200,
            response.data = { msg: "Sign Up Successfull", data: data,accessToken}
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
            response.data = { msg: "Sign Up failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
        response.data = { msg: error }
        return response

    }
}

const login = async(email,password) =>{
    let response = {}
    try {
        
        let comparering = false
        
        const data = await Auth.find({ email })
        
        if (data[0] != null) {
            comparering = await bcrypt.compare(password, data[0].password);
        }

        if (comparering) {
            const accessToken = generateJWT({email, userName:data[0].userName })
            console.log("data",data,comparering)
            response.status = 200,
            response.data = { msg: "Login Successfull", data: data,accessToken}
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
            response.data = { msg: "Login failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
        response.data = { msg: error }
        return response

    }
}

const decryptJWT = async(token) =>{
    let response = {}
    try {
        console.log("token",token)
        const data = await verifyJWT(token)
        console.log("data DECRYPT JWT ==>",data)
        if (data) {
            console.log("data", data)
            response.status = 200,
            response.data = { msg: "Decryption Successfull", data: data}
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "Decryption failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}



module.exports = {signup,login,decryptJWT}