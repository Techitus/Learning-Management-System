import mongoose,{Schema}from "mongoose";
interface ICourse extends Document {
    courseName : string,
    courseDescription : string,
    coursePrice : string,
    courseDuration : string,
    thumbnail : string,
    mentor : mongoose.Types.ObjectId,  
    category : mongoose.Types.ObjectId,
    lessons : mongoose.Types.ObjectId[],
    createdAt : Date
}
const courseSchema = new Schema<ICourse>({
    courseName: {
        type: String,
        required: true,
        unique : true
    },
    courseDescription : {
        type: String,
    },
    coursePrice: {
        type: String,
        required: true,
    },
    courseDuration : {
        type: String,
        required : true
    },thumbnail : {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },mentor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // lessons :[
    //     {
    //         type: Schema.Types.ObjectId,
    //     ref: "Lessons", 
    //     }
    // ],
    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const Courses = mongoose.models.courses || mongoose.model("courses", courseSchema);

export default Courses