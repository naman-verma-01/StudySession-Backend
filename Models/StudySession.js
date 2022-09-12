const {mongoose} = require("mongoose")

const studySessionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    subject:{
        type:String,
    },
    startTime:{
        type: Date,
    },
    endTime:{
        type: Date,
    },
    maxStudents:{
        type:Number
    },
    registeredStudents:{
        type:Number,
        default:1,
    },
    regStudentDetails:[{
        _id: false,
        userName:String,
        email:String
    }],
    postedByEmail:{
        type:String
    }

    
}

);


const StudySession = mongoose.model('StudySession', studySessionSchema);
module.exports = StudySession