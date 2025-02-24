import { Role } from "@/database/models/user.schema";
import { Status } from "@/types/status.types";

export interface IUsers{
    _id : string,
    username : string,
    profileImage : string,
    email : string,
    role : Role,
    createdAt: string,
    
}
export interface IUsersInitialState {
    users :IUsers[],
    status : Status,
}