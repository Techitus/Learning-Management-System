import { Status } from "@/types/status.types";

export interface INotes{
    _id? : string,
    attachment : string,
    course : string,
    
}
export interface INotesInitialState {
    notes :INotes[],
    status : Status,
}
