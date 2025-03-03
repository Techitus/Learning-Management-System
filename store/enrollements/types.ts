import { Status } from "@/types/status.types";
interface IStudent {
    username : string,
    _id : string,
    profileImage : string,
    email : string,
    
}
interface ICourse {
_id : string,
courseName : string,
coursePrice : string,

}
export interface IEnrollment {
    _id? : string,
    student : IStudent,
    course : ICourse,
    whatsapp : string,
    paymentVerification : string,
    enrollAt : Date,
}

export interface IEnrollmentState {
    enrollments : IEnrollment[],
     status : Status,
}