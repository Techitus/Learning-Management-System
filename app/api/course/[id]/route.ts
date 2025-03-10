import { deleteCourse, updateCourse } from "../course.controller";
import { use } from "react";

export  function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } =  use(params);
    return updateCourse(id, request);
}

export  function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } =  use(params);
    return deleteCourse(id, request);
}