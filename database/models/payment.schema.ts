import mongoose,{Schema}from "mongoose";
enum  Status{
  Completed = 'completed',
  Pending = 'pending',
  Failed = 'failed',
}
interface IPayment extends Document {
    student : mongoose.Types.ObjectId,
    course : mongoose.Types.ObjectId,
    paymentAmount : number,
    paymentDate : Date,
    status : Status, 
}

const paymentSchema = new Schema<IPayment>({
    student : {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    course : {
        type : Schema.Types.ObjectId,
        ref: "Course"
    },
    paymentAmount : {
        type : Number,
        required : true
    },
    paymentDate : {
        type : Date,
        default : Date.now()
    },
    status : {
        type : String,
        enum : [Status.Pending,Status.Completed,Status.Failed],
        default : Status.Pending
    }
})

const Payment = mongoose.model('Payment', paymentSchema)
export default Payment