import { deleteUser } from "../user.controller";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    return deleteUser(id, request);
}