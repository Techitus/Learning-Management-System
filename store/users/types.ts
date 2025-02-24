import { Status } from "@/types/status.types";

interface IUsers{
    _id : string,
    name : string,
    createdAt : string,
}
export interface IUsersInitialState {
    users :IUsers[],
    status : Status,
}