import { Status } from "@/types/status.types";

interface ICategory{
    _id : string,
    name : string,
    createdAt : string,
}
export interface ICategoryInitialState {
    categories :ICategory[],
    status : Status,
}