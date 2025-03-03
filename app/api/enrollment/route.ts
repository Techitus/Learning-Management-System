import { NextRequest } from "next/server";
import { createEnrollment, fetchEnrollments } from "./enrollement.controller";

export async function POST(request: NextRequest) {
  return createEnrollment(request);
}

export async function GET() {
    return fetchEnrollments();
  }