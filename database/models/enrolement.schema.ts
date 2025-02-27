import mongoose,{Schema} from "mongoose";

interface IEnrollment extends Document {
     student : mongoose.Types.ObjectId,
     course : mongoose.Types.ObjectId,
       whatsapp : string,
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
         whatsapp :{
            type : String,
            required : true
         },
         enrollAt : {
            type : Date,
            default : Date.now()
         }
    
         
})

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment