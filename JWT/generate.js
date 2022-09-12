const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config()

module.exports = (user) =>
{
    if(!user)
    {
        throw new Error("User is not provided for producing the JWT token");
    }
    
    const privateKey =  process.env.ACCESS_TOKEN_SECRET
    
    

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)


      return token;


}