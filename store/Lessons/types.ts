import { Status } from "@/types/status.types";

export interface ILesson{
    _id : string,
    title : string,
    description : string,
    videoUrl : string,
    ytVideoUrl : string,
    course : string,
    
}
export interface ILessonInitialState {
    lessons :ILesson[],
    status : Status,
}
