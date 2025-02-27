import mongoose, {Schema} from "mongoose"
interface INotes extends Document {
   course : mongoose.Types.ObjectId
   attachment : string,
   createdAt : Date
}
const notesSchema = new Schema<INotes>({
       course : {
           type : Schema.Types.ObjectId,
           required : true
       },
       attachment : {
        type : String,
        required : true
       },
       createdAt : {
        type : Date,
        default : Date.now()
       }
})
const Notes = mongoose.model('Notes', notesSchema)
export default Notes