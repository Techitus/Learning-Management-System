import dbConnect from "@/database/connection"
import Category from "@/database/models/category.schema"
import { authMiddleware } from "@/middleware/auth.middleware"
import { NextRequest } from "next/server"

export async function createCategory(request: Request){
   try{
    authMiddleware(request as NextRequest)

    await dbConnect()
    const {name} = await request.json()
    const existingCategory = await Category.findOne({name: name})
    if(existingCategory){
        return Response.json({
            message : "Category already exists 🥴"
        },{status:400})
    }
  const category =  await Category.create({
        name
    })
    return Response.json({
        message : "Category created successfully 🥰 ",
        data : category
    },{
        status : 200
    })
   }catch(error){
    console.log(error)
    return Response.json({
        message : "Error creating category 🙃"
    },{status:500})
   }
}

export async function getCategories(){
    await dbConnect()
    const categories = await Category.find()
    if(categories.length === 0){
        return Response.json({
            message : "No categories found 🥴"
        },{status:404})
    }
    return Response.json({
        message : "Categories fetch Successfully 😍",
        data : categories
    },{
        status : 200,
        
    })
}
export async function deleteCategory(id:string ,request: Request){
    try{
       await dbConnect()
       authMiddleware(request as NextRequest) 
     const deleted = await Category.findByIdAndDelete(id)
     if(!deleted){
        return Response.json({
            message : "Category not found or deleted 😴"
        },{status:404})
     }
     return Response.json({
        message : "Category deleted successfully 😍 "
        },{status : 200})
    }catch(err){
        console.log(err)
        return Response.json({
            message : "Error deleting category 🙃"
        },{status:500})
    }
}

export async function updateCategory(id: string, request: Request) {
    try {
        await dbConnect();
        authMiddleware(request as NextRequest);

        const { name } = await request.json();

        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return Response.json({
                message: "Category not found 😴"
            }, { status: 404 });
        }

        existingCategory.name = name;
        await existingCategory.save();

        return Response.json({
            message: "Category updated successfully 😊",
            data: existingCategory
        }, { status: 200 });

    } catch (err) {
        console.log(err);
        return Response.json({
            message: "Error updating category 🙃"
        }, { status: 500 });
    }
}