import dbConnect from "@/database/connection";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";
import Notes from "@/database/models/notes.schema";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudniary";

export async function createNotes(request: Request) {
  try {
    await dbConnect();
    const authResponse = await authMiddleware(request as NextRequest);
    
    if (!authResponse) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action 😒" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("attachment") as File | null;
    const course = formData.get("course");

    if (!course) {
      return NextResponse.json(
        { message: "Course ID is required!" },
        { status: 400 }
      );
    }

    let attachmentPath = "";

    if (file) {
      const fileType = file.type; 
      const allowedFileTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

      if (!allowedFileTypes.includes(fileType)) {
        return NextResponse.json(
          { message: "Only images (JPG, PNG, WebP) and PDFs are allowed!" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "notes",
            resource_type: fileType === "application/pdf" ? "raw" : "image",
            allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
          },
          (error, result) => {
            if (error || !result) reject(error || new Error("Upload failed"));
            else resolve(result);
          }
        ).end(buffer);
      });

      attachmentPath = uploadResponse.secure_url;
    }

    const newNotes = await Notes.create({
      attachment: attachmentPath,
      course,
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
          console.log("Deleting note with ID:", id);
  
          await dbConnect();
  
          const authResponse = await authMiddleware(request as NextRequest);
          if (!authResponse) {
              return NextResponse.json(
                  { message: "You are not authorized to perform this action 😒" },
                  { status: 401 }
              );
          }
  
          if (!mongoose.Types.ObjectId.isValid(id)) {
              return NextResponse.json({ message: "Invalid note ID provided 🤨" }, { status: 400 });
          }
  
          const note = await Notes.findById(id);
          if (!note) {
              return NextResponse.json({ message: "Note not found 🤔" }, { status: 404 });
          }
  
          await Notes.findByIdAndDelete(id);
  
          return NextResponse.json({ message: "Note deleted successfully 😍" }, { status: 200 });
      } catch (error) {
          return NextResponse.json(
              { message: "Error deleting note 🙃", error: (error as Error).message },
              { status: 500 }
          );
      }
  }
  