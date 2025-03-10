import { NextRequest } from "next/server";
import { deleteUser, promoteToTeacher } from "../user.controller";
import {use} from 'react';
export  function DELETE(request: Request,     { params }: { params: Promise<{ id: string }> }


) {
    const { id } =  use(params);
    return deleteUser(id, request);
}
export  function PATCH(req: NextRequest,     { params }: { params: Promise<{ id: string }> }

) {
    const { id } =  use(params);
    return promoteToTeacher(id,req);
}