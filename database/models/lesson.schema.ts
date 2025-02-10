import mongoose, {Schema} from "mongoose"
interface ILesson extends Document {
   course : mongoose.Types.ObjectId
   title : string,
   description : string,
   videoUrl : string,
   createdAt : Date
}
const lessonSchema = new Schema<ILesson>({
       course : {
           type : Schema.Types.ObjectId,
           required : true
       },
       title : {
        type : String,
        required : true
       },   
       description : {
        type : String,
        required : true
       },
       videoUrl : {
        type : String,
        required : true
       },
       createdAt : {
        type : Date,
        default : Date.now()
       }
})
const Lessons = mongoose.model('Lesson', lessonSchema)
export default Lessons