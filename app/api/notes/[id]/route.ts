import { deleteNote } from "../notes.controller";


export async function DELETE(request: Request, { params }: { params: { id: string } }
) {
    const { id } = await params;
    return deleteNote(id, request);
}
