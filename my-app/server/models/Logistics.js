const mongoose = require("mongoose");


const FileSchema = new mongoose.Schema({
    base64: String,
    extension: String,
    fileSize: String,
    key: String,
    name: String,
    progress: Number,
    status: String,
    file: Object
});

const LogisticsSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    OldSchedule: {
        type: String, //any file, preferably .txt
        required: true
    },
    NewSchedule: {
        type: String,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    Semester: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: false
    },
    Time: {
        type: Date,
        default: Date.now,
        required: true
    },
    MasterCalendar: {
        type: String, //.ics file
        required: false
    },
    Files: {
        type: [FileSchema], //array of files for more specification
        required: false
    },
    ClassWebsite: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    CourseWebsite: {
        type: String,
        required: true
    }
})

const LogisticsModel = mongoose.model("schedules", LogisticsSchema);
module.exports = LogisticsModel;
