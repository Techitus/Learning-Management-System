import mongoose,{Schema}from "mongoose";
interface ICourse extends Document {
    courseName : string,
    courseDescription : string,
    coursePrice : number,
    courseDuration : string
    category : mongoose.Types.ObjectId,
    lessons : mongoose.Types.ObjectId[],
    createdAt : Date
}
const courseSchema = new Schema<ICourse>({
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
        required : true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    lessons :[
        {
            type: Schema.Types.ObjectId,
        ref: "Lessons", 
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const Courses =mongoose.models.Course ||mongoose.model("courses", courseSchema)
export default Courses