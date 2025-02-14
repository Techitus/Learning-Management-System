import mongoose,{Schema} from "mongoose";

interface ITeacher extends Document {
    coursesTaught : mongoose.Types.ObjectId[]
    courseCategory : mongoose.Types.ObjectId
}

const teacherSchema = new Schema<ITeacher>({
    coursesTaught : {
        type : [Schema.Types.ObjectId],
        ref: "Course"
    },
    courseCategory : {
        type : Schema.Types.ObjectId,
        ref: "Category"
    }
})

const Teacher = mongoose.model('Teacher', teacherSchema)
export default Teacher