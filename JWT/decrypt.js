const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config()

module.exports =async (token) =>
{
    if(token == '')  // if the accesstoken is given empty
    {
        return false;
    }
    
    if(!token){ //if no otken present
        
        throw new Error("Token is not Given");

    }
    

    try 
    {
        
        const decrypt =   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        


        if(!decrypt)
        {
            return false;
        }
        else 
        {
            return decrypt; //return the payload
        }

    }
    catch(err)
    {
        console.log(err);
        return false;
    }
    

}