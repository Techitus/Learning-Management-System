import { NextRequest } from "next/server";
import { deleteUser, promoteToTeacher } from "../user.controller";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    return deleteUser(id, request);
}
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    return promoteToTeacher(id,request);
}