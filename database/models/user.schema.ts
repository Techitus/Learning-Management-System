import mongoose, { Schema, Document, models } from "mongoose";

export enum Role {
    Student = 'student',
    Admin = 'admin',
    Teacher = 'teacher'
}

interface IUser extends Document {
    username: string;
    profileImage: string;
    email: string;
    role: Role;
    createdAt : Date
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    profileImage: String,
    role: {
        type: String,
        enum: [Role.Admin, Role.Student, Role.Teacher],
        default: Role.Student,
        required: true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

// Prevent model overwrite issue
const User = models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
