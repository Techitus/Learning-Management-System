import dbConnect from "@/database/connection"
import Category from "@/database/models/category.schema"

export async function createCategory(request: Request){
   try{
    await dbConnect()
    const {name,description} = await request.json()
    const existingCategory = await Category.findOne({name: name})
    if(existingCategory){
        return Response.json({
            message : "Category already exists 🥴"
        },{status:400})
    }
    await Category.create({
        name,description
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
