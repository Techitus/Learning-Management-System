import { deleteLesson,  updateLesson } from "../lesson.controller";
import {use} from 'react';
export  function PATCH( request: Request,    { params }: { params: Promise<{ id: string }> }

) {
    const { id } = use( params);
    return updateLesson(id, request);
}

export  function DELETE(request: Request,     { params }: { params: Promise<{ id: string }> }

) {
    const { id } =  use(params);
    return deleteLesson(id, request);
}

