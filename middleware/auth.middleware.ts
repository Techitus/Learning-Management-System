/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Role } from "@/database/models/user.schema"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { Session } from "next-auth"

export const authMiddleware = async (request: NextRequest) => {
  const session = (await getServerSession(authOptions)) as Session | null

  // Check if user is logged in and has an admin role
  if (!session?.user || session.user.role !== Role.Admin) {
    return NextResponse.json(
      { message: "You do not have permission to perform this action 😒" },
      { status: 401 }
    )
  }

  return NextResponse.next() //return pxi ko kura run grna
}
