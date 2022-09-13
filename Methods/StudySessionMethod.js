const StudySession = require("../Models/StudySession")


const createSession = async (title, subject, startTime, endTime, maxStudents, postedByEmail) => {
    let response = {}
    try {
        const studySession = await new StudySession({ title, subject, startTime, endTime, maxStudents, postedByEmail })
        const data = await studySession.save()

        if (data) {
            response.status = 200,
                response.data = { msg: "Study Session Created Successfully", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "Create Session failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}


const getSession = async () => {
    let response = {}
    try {
        const data = await StudySession.find()

        if (data) {
            response.status = 200,
                response.data = { msg: "Study Session Fetched Successfully", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "Fetching Sessions failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}

const getSortedSession = async (order) => {
    let response = {}
    try {

        const data = await StudySession.find().sort({ startTime: order })

        if (data) {
            response.status = 200,
                response.data = { msg: "Study Session Fetched Successfully", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "Fetching Sessions failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}

const registerForSession = async (id, email, userName) => {
    let response = {}
    try {
        let check = await StudySession.findById(id)
        let data

        for (var x = 0; x < check.regStudentDetails.length; x++) {
            console.log(check.regStudentDetails[x].email == email)
            if (check.regStudentDetails[x].email == email && check.regStudentDetails[x].userName == userName) {

                response.status = 200,
                response.data = { msg: "Already registered for Study Session" }
                return response
            }
        }

        if (check.registeredStudents < check.maxStudents) {
            data = await StudySession.findByIdAndUpdate(id, { $push: { regStudentDetails: { email, userName } }, $inc: { registeredStudents: 1 } })
        }
        else {
            data = "Slots Full"
        }
        if (data) {
            response.status = 200,
                response.data = { msg: "Study Session Updated Successfully", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
            response.data = { msg: "Updating Session failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}


const getSessionsOfUser = async (email) => {
    let response = {}
    try {

        const data = await StudySession.find({ postedByEmail: email })

        if (data) {
            response.status = 200,
                response.data = { msg: "Study Session Fetched Successfully", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "Fetching Sessions failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}
module.exports = { createSession, getSession, getSortedSession, registerForSession, getSessionsOfUser }