/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import Courses from "@/database/models/course.schema";
import dbConnect from "@/database/connection";
import mongoose from "mongoose";
import { authMiddleware } from "@/middleware/auth.middleware";

export async function createCourse(req: Request) {
  try {
    await dbConnect();
      await  authMiddleware(req as NextRequest)
    
    const formData = await req.formData();
    
    const courseName = formData.get("courseName") as string;
    const courseDescription = formData.get("courseDescription") as string;
    const coursePrice = parseFloat(formData.get("coursePrice") as string);
    const courseDuration = formData.get("courseDuration") as string;
    const category = new mongoose.Types.ObjectId(formData.get("category") as string);
    const mentor = new mongoose.Types.ObjectId(formData.get("mentor") as string);
    const file = formData.get("thumbnail") as File | null;
    
    let thumbnailPath = "";
    
    if (file) {
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
      }
      
      const filePath = path.join(uploadDir, filename);
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      await writeFile(filePath, buffer);
      
      thumbnailPath = `/uploads/${filename}`;
    }
    
    const newCourse = await Courses.create({
      courseName,
      courseDescription,
      coursePrice,
      courseDuration,
      category,
      mentor,
      thumbnail: thumbnailPath,
    });
    
    return NextResponse.json(
      { message: "Course created successfully 🎉", data: newCourse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { message: "Error creating course 😢", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function fetchCourses(request:Request){
    try{
        await dbConnect()
       const courses = await Courses.find()
       if(courses.length === 0){
        return Response.json({
            message : "No categories found 🥴"
        },{status:404})
    }
    return Response.json({
        message : "Courses fetch Successfully 😍",
        data : courses
    },{
        status : 200,
        
    })

    }catch(error){
      return  NextResponse.json(
        { message: "Error creating course 😢", error: (error as Error).message },
      { status: 500 }
      )
    }
}


export async function deleteCourse(id:string ,request: Request){
    try{
       await dbConnect()
     await  authMiddleware(request as NextRequest) 
     const deleted = await Courses.findByIdAndDelete(id)
     if(!deleted){
        return Response.json({
            message : "Courses are not found or deleted 😴"
        },{status:404})
     }
     return Response.json({
        message : "Courses deleted successfully 😍 "
        },{status : 200})
    }catch(err){
        console.log(err)
        return Response.json({
            message : "Error deleting Courses 🙃"
        },{status:500})
    }
}
export async function updateCourse(id: string, req: Request) {
    try {
     
      await dbConnect();
  
     
      await authMiddleware(req as NextRequest);
  
      
      const formData = await req.formData();
  
      
      const courseName = formData.get("courseName") as string;
      const courseDescription = formData.get("courseDescription") as string;
      const coursePrice = parseFloat(formData.get("coursePrice") as string);
      const courseDuration = formData.get("courseDuration") as string;
      const category = new mongoose.Types.ObjectId(formData.get("category") as string);
      const mentor = new mongoose.Types.ObjectId(formData.get("mentor") as string);
      const file = formData.get("thumbnail") as File | null;
  
      let thumbnailPath = "";
  
      
      if (file) {
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
        
        await mkdir(uploadDir, { recursive: true });
  
        const filePath = path.join(uploadDir, filename);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
  
       
        await writeFile(filePath, buffer);
  
        
        thumbnailPath = `/uploads/${filename}`;
      }
  
      
      const updatedCourse = await Courses.findByIdAndUpdate(
        id,
        {
          courseName,
          courseDescription,
          coursePrice,
          courseDuration,
          category,
          mentor,
          thumbnail: thumbnailPath || undefined,  
        },
        { new: true } 
      );
  
      
      if (!updatedCourse) {
        return NextResponse.json(
          { message: "Course not found 🥲" },
          { status: 404 }
        );
      }
  
     
      return NextResponse.json(
        { message: "Course updated successfully 🎉", data: updatedCourse },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating course:", error);
      return NextResponse.json(
        { message: "Error updating course 😢", error: (error as Error).message },
        { status: 500 }
      );
    }
  }