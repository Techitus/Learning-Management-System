import { deleteCategory, updateCategory } from "../category.controller";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    return updateCategory(id, request);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    return deleteCategory(id, request);
}