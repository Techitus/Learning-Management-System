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
    await Category.create({
        name
    })
    return Response.json({
        message : "Category created successfully 🥰 "
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