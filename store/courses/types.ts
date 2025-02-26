import { Status } from "@/types/status.types";
type Mentor ={
    _id : string,
    username : string
}
type Category ={
    _id : string,
    name : string
}
export interface ICourses{
    _id : string,
    courseName : string,
    courseDescription : string,
    coursePrice : string,
    courseDuration : string,
    thumbnail : string,
    mentor : Mentor,
    category : Category
    createdAt : string,
}
export interface ICoursesInitialState {
    courses :ICourses[],
    status : Status,
}