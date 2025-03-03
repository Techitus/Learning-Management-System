/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/database/connection";
import Enrollment from "@/database/models/enrolement.schema";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
import Courses from "@/database/models/course.schema";
import User from "@/database/models/user.schema";
import mongoose from "mongoose"; 
import { writeFile, mkdir } from "fs/promises";
import path from "path";
export async function createEnrollment(request: Request) {
    try {
      await dbConnect();
      
    
  
      const formData = await request.formData();
      const whatsapp = parseFloat(formData.get("whatsapp") as string);
      const student = new mongoose.Types.ObjectId(formData.get("student") as string);
      const course = new mongoose.Types.ObjectId(formData.get("course") as string);
      const file = formData.get("paymentVerification") as File | null;
      
      let paymentVerificationPath = "";
      if (file) {
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, filename);
        const bytes = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(bytes));
        paymentVerificationPath = `/uploads/${filename}`;
      }
  
      const enrollment = await Enrollment.create({
        student,
        course,
        whatsapp,
        paymentVerification: paymentVerificationPath,
      });
  
      return NextResponse.json(
        { message: "Enrollment created successfully 🎉", data: enrollment },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error creating Enrollment 😢", error: (error as Error).message },
        { status: 500 }
      );
    }
  }

  export async function fetchEnrollments(){
    try {
        await dbConnect()
        const models = { Enrollment, User, Courses };
        const data = await Enrollment.find().populate("course").populate("student")
        if(data.length === 0){
            return Response.json({
                message : "no enrollment found 🥴"
            },{status:404})
        }
        return Response.json({
            message : "Enrollments fetched!! 😍", 
            data
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({

            message : "Something went wrong 😒"
        },{status : 500})
    }
}

export async function deleteEnrollment(id: string, request: Request) {
    try {
        await dbConnect();
        const authResponse =  await authMiddleware(request as NextRequest)
        if(!authResponse){
            return Response.json({
                message : "You are not authorized to perform this action 😒"
            },{status:401})
        }
        const deleted = await Enrollment.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: "Enrollment not found or already deleted 😴" }, { status: 404 });
        }
        return NextResponse.json({ message: "Enrollment deleted successfully 😍" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting enrollment 🙃", error: (error as Error).message },
            { status: 500 }
        );
    }
}
export async function fetchEnrollment(request:Request,id:string){
    try{
        await dbConnect();
        const authResponse =  await authMiddleware(request as NextRequest)
        if(!authResponse){
            return Response.json({
                message : "You are not authorized to perform this action 😒 "
            },{status:401})
        }
        const enrollment = await Enrollment.findById(id).populate("course").populate("student") 
        if(!enrollment){
            return Response.json({
                message : "no enrollment with that id found 🥴"
            },{status:404})
        }
        return Response.json({
            message : "Enrollments fetched!! 😍", 
           data: enrollment
        },{status:200})
    }catch(error){
        return NextResponse.json(
              { message: "Error fetching enrollments 😢", error: (error as Error).message },
              { status: 500 }
            );
          }
}
export async function changeEnrollmentStatus(request:Request,id:string){
    try {
        await dbConnect(); 
        const authResponse =  await authMiddleware(request as NextRequest)
        if(!authResponse){
            return Response.json({  
                message : "You are not authorized to perform this action 😒"
            },{status:401})
        }
        const {status} = await request.json()
        const data = await Enrollment.findByIdAndUpdate(id,{
            enrollmentStatus : status
        })
        return Response.json({
            message : "enrollment status updated 😍", 
            
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({
            message : "Something went wrong 😒"
        },{status : 500})
    }
}