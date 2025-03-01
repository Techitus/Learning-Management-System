import { createNotes, fetchNotes } from "./notes.controller"

export async function POST(request:Request){
    return createNotes(request)
}

export async function GET(request:Request){
    return fetchNotes(request)
}