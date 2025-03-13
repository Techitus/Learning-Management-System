import { deleteLesson,  updateLesson } from "../lesson.controller";
export  async function PATCH( request: Request,    { params }: { params: Promise<{ id: string }> }

) {
    const { id } = await params; 
    return updateLesson(id, request);
}

export async function DELETE(request: Request,     { params }: { params: Promise<{ id: string }> }

) {
    const { id } = await params; 
    return deleteLesson(id, request);
}

