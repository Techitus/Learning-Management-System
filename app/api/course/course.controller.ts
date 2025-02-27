/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import Courses from "@/database/models/course.schema";
import Category from "@/database/models/category.schema";
import User from "@/database/models/user.schema";
import dbConnect from "@/database/connection";
import { authMiddleware } from "@/middleware/auth.middleware";

export async function createCourse(request: Request) {
  try {
    await dbConnect();
    const authResponse =  await authMiddleware(request as NextRequest)
    if(!authResponse){
      return Response.json({
          message : "You are not authorized to perform this action 😒"
      },{status:401})
  }

    const formData = await request.formData();
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
      await writeFile(filePath, Buffer.from(bytes));
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
    return NextResponse.json(
      { message: "Error creating course 😢", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function fetchCourses(req: Request) {
  try {
    await dbConnect();
    const models = { Category, User, Courses };
    const courses = await Courses.find()
      .populate("category", "name")
      .populate({ path: "mentor", select: "username", model: "User" });
    if (courses.length === 0) {
      return NextResponse.json({ message: "No courses found 🥴" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Courses fetched successfully 😍", data: courses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching courses 😢", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function deleteCourse(id: string, request: Request) {
  try {
    await dbConnect();
    const authResponse =  await authMiddleware(request as NextRequest)
      if(!authResponse){
        return Response.json({
            message : "You are not authorized to perform this action 😒"
        },{status:401})
    }
    const deleted = await Courses.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Course not found or already deleted 😴" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted successfully 😍" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting course 🙃", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function updateCourse(id: string, request: Request) {
  try {
    await dbConnect();
    const authResponse =  await authMiddleware(request as NextRequest)
    if(!authResponse){
      return Response.json({
          message : "You are not authorized to perform this action 😒"
      },{status:401})
  }
    const formData = await request.formData();
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
      await writeFile(filePath, Buffer.from(bytes));
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
    return NextResponse.json(
      { message: "Error updating course 😢", error: (error as Error).message },
      { status: 500 }
    );
  }
}
