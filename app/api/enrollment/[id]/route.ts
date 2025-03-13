import { changeEnrollmentStatus, deleteEnrollment, fetchEnrollment } from "../enrollement.controller";

export  async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; 
    return fetchEnrollment(request,id);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; 
    return deleteEnrollment(id, request);

}
export async function PATCH(request:Request,    
    { params }: { params: Promise<{ id: string }> }
){

    const { id } = await params; 
    return changeEnrollmentStatus(request,id)
}