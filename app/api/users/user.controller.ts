import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export async function fetchUsers(request:Request){
    try {
        await dbConnect();
        authMiddleware(request as NextRequest)
        const users = await User.find().select('-password');
        return NextResponse.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
          { error: "Internal Server Error 😴" },
          { status: 500 }
        );
      }
}

export async function deleteUser(id:string,request:Request){
    try {
        await dbConnect();
        authMiddleware(request as NextRequest)
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json(
              { message: "User not found 🙃" },
              { status: 404 }
            );
        }
        return NextResponse.json({ message: "User deleted successfully 😍" });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
          { error: "Internal Server Error 😴" },
          { status: 500 }
        );
    }
}