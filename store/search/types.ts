import { ICourses } from "../courses/types";
import { IUsers } from "../users/types";

export interface SearchResults {
    courses: ICourses[];
    users: IUsers[];
  }
  
  export interface SearchState {
    query: string;
    results: SearchResults;
    loading: boolean;
    error: string | null;
  }
  