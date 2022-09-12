const mongoose = require('mongoose')
const express = require('express')
const port = process.env.PORT || 1800;
const app = express();

const MONGODB_URI = "mongodb+srv://Naman:jqgklUCDwuEYcbDG@cluster0.pzu0fde.mongodb.net/?retryWrites=true&w=majority"//'mongodb://localhost/studySession'
const AuthRoute = require('./Routes/AuthRoute')
const StudySessionRoute = require('./Routes/StudySessionRoute')

const {json} = require('body-parser')
var cors = require('cors');

app.use(json());
app.use(cors())
app.use("/auth/", AuthRoute);
app.use("/studysession/", StudySessionRoute);   


const start = async () => {
    mongoose.Promise = global.Promise;

    await mongoose.connect(MONGODB_URI).then(console.log("MongoDB Database connected"));

    app.listen(port || port, async () => {
        console.log(`Server Connected To Port: ${port}`)
        
    });

};

start();
