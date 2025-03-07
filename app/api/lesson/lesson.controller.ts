import dbConnect from "@/database/connection"
import Lessons from "@/database/models/lesson.schema"
import { authMiddleware } from "@/middleware/auth.middleware"
import { mkdir, writeFile } from "fs/promises"
import mongoose from "mongoose"
import { NextRequest } from "next/server"
import path from "path"


export async function createLessons(request: Request) {
    try {
      await dbConnect();

  
      const formData = await request.formData();
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const course = new mongoose.Types.ObjectId(formData.get("course") as string);
      const file = formData.get("videoUrl") as File | null;
      
      let vedioPath = "";
      if (file) {
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, filename);
        const bytes = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(bytes));
        vedioPath = `/uploads/${filename}`;
      }
  
      const newLesson = await Lessons.create({
        title,
        description,
        videoUrl: vedioPath,
        course,        
      });
  
      return Response.json(
        { message: "Lesson created successfully 🎉", data: newLesson },
        { status: 201 }
      );
    } catch (error) {
      return Response.json(
        { message: "Error creating lessons 😢", error: (error as Error).message },
        { status: 500 }
      );
    }
  }
export async function fetchLessons(request:Request){
    try{
     await dbConnect()
   const {searchParams} =  new URL(request.url)
    const courseId = searchParams.get('courseId')
     const response = await Lessons.find({
        course: courseId
     }).populate('course')
     return Response.json({
         message : "Lessons fetched successfully 😍",
         data : response
     })
    }catch(err){
        return Response.json({
            message : "Internal server error 🙃",
            err
        },{status : 500})
    }
}

export async function updateLesson(id:string,request: Request){
    try{
        await dbConnect()
        const authResponse = await authMiddleware(request as NextRequest)
        if(!authResponse){
            return Response.json({
                message : "You are not authorized to perform this action 😒"
            },{status:401})
        }
        const {title,description,videoUrl} = await request.json()
        const lesson = await Lessons.findByIdAndUpdate(id,{
            title,
            description,
            videoUrl
        },{new:true})
        if(!lesson){
            return Response.json({
                message : "Lesson not found 😴",
                
            },{status:404})
        }
        return Response.json({
            message : "Lesson updated successfully 😍",
            data : lesson
        })

    }catch(err){
        return Response.json({
            message : "Internal server error 🙃",
            err
        },{status : 500})
    }
}

export async function deleteLesson(id:string, request: Request){
    try{
        await dbConnect()
        const authResponse = await authMiddleware(request as NextRequest)
        if(!authResponse){
            return Response.json({
                message : "You are not authorized to perform this action 🥴"
            },{status:401})
        }
        const lesson = await Lessons.findByIdAndDelete(id)
        if(!lesson){
            return Response.json({
                message : "Lesson not found or deleted 😴"
            },{status:404})
        }
        return Response.json({
            message : "Lesson deleted successfully 😍"
        })

    }catch(err){
        return Response.json({
            message : "Internal server error 🙃",
            err
        },{status : 500})
    }
}

