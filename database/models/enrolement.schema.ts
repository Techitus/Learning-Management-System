import mongoose,{Schema} from "mongoose";

interface IEnrollment extends Document {
     student : mongoose.Types.ObjectId,
     course : mongoose.Types.ObjectId,
     enrollAt : Date,
}

const enrollmentSchema = new Schema<IEnrollment>({
         student : {
            type : Schema.Types.ObjectId,
            ref: "User"
         },
         course : {
            type : Schema.Types.ObjectId,
            ref: "Course"
         },
         enrollAt : {
            type : Date,
            default : Date.now()
         }
    
         
})

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment