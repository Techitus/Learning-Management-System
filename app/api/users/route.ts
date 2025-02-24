import { fetchUsers } from "./user.controller";

export async function GET(request:Request){
   return fetchUsers(request)
}
