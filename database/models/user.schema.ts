import mongoose from "mongoose";
const Schema =mongoose.Schema
export enum Role {
    Student = 'student',
    Admin = 'admin',
    Teacher = 'teacher'
}
interface IUser extends Document {
    username : string;
    profileImage : string;
    email : string;
    role : Role
}
const userSchema =new Schema<IUser>({
    username :{
        type : String,
        required: true,

    },
    email : {
      type : String,
      required : true
    },
    profileImage   : String,

    role : {
        type : String,
        enum : [Role.Admin ,Role.Student,Role.Teacher],
        default : Role.Student,
        required : true
    }
    
})

const User = mongoose.model("User",userSchema)
export default User