import dbConnect from "@/database/connection";
import Enrollment from "@/database/models/enrolement.schema";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export async function createEnrollemnt(request:Request){
    try{
        await dbConnect();
        const authResponse =  await authMiddleware(request as NextRequest)
        if(!authResponse){
            return Response.json({
                message : "You are not authorized to perform this action 😒 "
            },{status:401})
        }
        const {student,course,whatsapp,enrollAt} = await request.json()
         const response = await Enrollment.create({
                student,
                course,
                whatsapp,
                enrollAt
         })
            return NextResponse.json(
                { message: "Enrollment created successfully 🎉", data: response },
                { status: 201 }
            );
    }catch(error){
        return NextResponse.json(
              { message: "Error fetching courses 😢", error: (error as Error).message },
              { status: 500 }
            );
          }
    }

export async function fetchEnrollments(request:Request){
    try{
        await dbConnect();
        const authResponse =  await authMiddleware(request as NextRequest)
        if(!authResponse){
            return Response.json({
                message : "You are not authorized to perform this action 😒 "
            },{status:401})
        }
        const enrollments = await Enrollment.find()
        .populate("student", "username")
        .populate({ path: "course", select: "name", model: "Course" });
        if (enrollments.length === 0) {
            return NextResponse.json({ message: "No enrollments found 🥴" }, { status: 404 });
        }
        return NextResponse.json(
            { message: "Enrollments fetched successfully 😍", data: enrollments },
            { status: 200 }
        );
    }catch(error){
        return NextResponse.json(
              { message: "Error fetching enrollments 😢", error: (error as Error).message },
              { status: 500 }
            );
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
                message : "no enrollment with that id found"
            },{status:404})
        }
        return Response.json({
            message : "enrollment fetched!!", 
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
            data
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({
            message : "Something went wrong 😒"
        },{status : 500})
    }
}