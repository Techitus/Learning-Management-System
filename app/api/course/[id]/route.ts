import { deleteCourse, updateCourse } from "../course.controller";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } =  await params;
    return updateCourse(id, request);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }  
  ) {
    const { id } = await params; 
    return deleteCourse(id, request);
  }
  