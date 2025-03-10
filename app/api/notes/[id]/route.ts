import { deleteNote } from "../notes.controller";
import {use} from "react"

export  function DELETE(request: Request,     { params }: { params: Promise<{ id: string }> }

) {
    const { id } =  use(params);
    return deleteNote(id, request);
}
