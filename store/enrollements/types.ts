import { EnrollmentStatus } from "@/database/models/enrolement.schema";
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
    enrollmentStatus : EnrollmentStatus,
    enrollAt : Date | string,
}

export interface IEnrollmentState {
    enrollments : IEnrollment[],
     status : Status,
}