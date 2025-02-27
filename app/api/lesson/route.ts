import { createLessons, fetchLessons } from "./lesson.controller"

export async function POST(request:Request){
    return createLessons(request)
}

export async function GET(){
    return fetchLessons()
}