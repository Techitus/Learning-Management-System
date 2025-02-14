import { createCategory } from "./category.controller";

export async function POST(request: Request){
   return createCategory(request)
}