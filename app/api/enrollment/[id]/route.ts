import { changeEnrollmentStatus, deleteEnrollment, fetchEnrollment } from "../enrollement.controller";
import {use} from 'react';

export  function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } =  use(params);
    return fetchEnrollment(request,id);
}

export  function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } =  use(params);
    return deleteEnrollment(id, request);

}
export  function PATCH(request:Request,    
    { params }: { params: Promise<{ id: string }> }
){

    const {id} =  use(params)
    return changeEnrollmentStatus(request,id)
}