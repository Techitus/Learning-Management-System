import mongoose,{Schema} from "mongoose";
export enum EnrollmentStatus{
   APPROVE = "approve", 
   REJECTED = "rejected", 
   PENDING = "pending"
}
interface IEnrollment extends Document {
     student : mongoose.Types.ObjectId,
     course : mongoose.Types.ObjectId,
       whatsapp : string,
     enrollAt : Date,
       enrollmentStatus : EnrollmentStatus,
       paymentVerification : string
}

const enrollmentSchema = new Schema<IEnrollment>({
         student : {
            type : Schema.Types.ObjectId,
            ref: "User"
         },
         course : {
            type : Schema.Types.ObjectId,
            ref: "Courses"
         },
         whatsapp :{
            type : String,
            required : true
         },
         paymentVerification :{
            type : String,
            required : true
         },
         enrollmentStatus : {
            type : String, 
            enum : [EnrollmentStatus.APPROVE,EnrollmentStatus.REJECTED,EnrollmentStatus.PENDING], 
            default : EnrollmentStatus.PENDING
        }, 
         enrollAt : {
            type : Date,
            default : Date.now()
         }
    
         
})

const Enrollment =mongoose.models.Enrollement || mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment