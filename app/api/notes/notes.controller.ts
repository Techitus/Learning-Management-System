import dbConnect from "@/database/connection";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import Notes from "@/database/models/notes.schema";

export async function createNotes(request: Request) {
    try {
      await dbConnect();
      const authResponse =  await authMiddleware(request as NextRequest)
      if(!authResponse){
        return Response.json({
            message : "You are not authorized to perform this action 😒"
        },{status:401})
    }
  
      const formData = await request.formData();
      const file = formData.get("attachment") as File | null;
      const course = formData.get("course") as string;

      let attachmentPath = "";
      if (file) {
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, filename);
        const bytes = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(bytes));
        attachmentPath = `/uploads/${filename}`;
      }
  
      const newNotes = await Notes.create({
        attachment: attachmentPath,
        course
      });
  
      return NextResponse.json(
        { message: "Notes created successfully 🎉", data: newNotes },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error creating notes 😢", error: (error as Error).message },
        { status: 500 }
      );
    }
  }

  export async function fetchNotes(request:Request) {
    try {
      const {searchParams} = new URL(request.url)
      const courseId = searchParams.get('courseId')
      await dbConnect();
      const courses = await Notes.find({
        course : courseId
      }).populate('course')
      if (courses.length === 0) {
        return NextResponse.json({ message: "No notes found 🥴" }, { status: 404 });
      }
  
      return NextResponse.json(
        { message: "Notes fetched successfully 😍", data: courses },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching notes 😢", error: (error as Error).message },
        { status: 500 }
      );
    }
  }
  
  export async function deleteNote(id: string, request: Request) {
    try {
      await dbConnect();
      const authResponse =  await authMiddleware(request as NextRequest)
        if(!authResponse){
          return Response.json({
              message : "You are not authorized to perform this action 😒"
          },{status:401})
      }
      const deleted = await Notes.findByIdAndDelete(id);
  
      if (!deleted) {
        return NextResponse.json({ message: "Note not found or already deleted 😴" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Note deleted successfully 😍" }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error deleting course 🙃", error: (error as Error).message },
        { status: 500 }
      );
    }
  }
  