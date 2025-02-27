import { deleteLesson, fetchLessonById, updateLesson } from "../lesson.controller";

export async function PATCH( request: Request,{ params }: { params: { id: string } }
) {
    const { id } = await params;
    return updateLesson(id, request);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }
) {
    const { id } = await params;
    return deleteLesson(id, request);
}

export async function GET(req:Request,{ params }: { params: { id: string } }
) {
    const { id } = await params;
    return fetchLessonById(id);
}