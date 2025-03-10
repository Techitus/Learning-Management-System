import { deleteCategory, updateCategory } from "../category.controller";
import { use } from "react";

export   function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = use(params);
    return updateCategory(id, request);
}

export  function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } =  use(params);
    return deleteCategory(id, request);
}