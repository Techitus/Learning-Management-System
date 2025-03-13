import { NextRequest } from "next/server";
import { deleteUser, promoteToTeacher } from "../user.controller";
export async function DELETE(request: Request,     { params }: { params: Promise<{ id: string }> }


) {
    const { id } = await params; 
    return deleteUser(id, request);
}
export async function PATCH(req: NextRequest,     { params }: { params: Promise<{ id: string }> }

) {
    const { id } = await params; 
    return promoteToTeacher(id,req);
}