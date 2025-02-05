import mongoose from "mongoose";
const Schema = mongoose.Schema

const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription : {
        type: String,
    },
    coursePrice: {
        type: Number,
        required: true,
    },
    courseDuration : {
        type: String,
    },

})

const Courses =mongoose.model("courses", courseSchema)
export default Courses