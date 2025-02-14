import { createCategory, getCategories } from "./category.controller";

export async function POST(request: Request){
   return createCategory(request)
}

export async function GET(){
   return getCategories()
}
