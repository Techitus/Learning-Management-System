import { Status } from "@/types/status.types";

export interface ICourses{
    _id : string,
    courseName : string,
    courseDescription : string,
    coursePrice : number,
    courseDuration : string,
    thumbnail : string,
    mentor : string,
    category : string
    createdAt : string,
}
export interface ICoursesInitialState {
    courses :ICourses[],
    status : Status,
}