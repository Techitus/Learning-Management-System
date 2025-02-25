import { NextRequest } from "next/server";
import { createCourse, fetchCourses } from "./course.controller";

export async function POST(request: NextRequest) {
  return createCourse(request);
}

export async function GET(request: NextRequest) {
    return fetchCourses(request);
  }