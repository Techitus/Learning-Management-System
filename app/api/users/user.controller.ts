import dbConnect from "@/database/connection";
import User, { Role } from "@/database/models/user.schema";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export async function fetchUsers(request:Request){
    try {
        await dbConnect();
      await  authMiddleware(request as NextRequest)
        const users = await User.find().select('-password');
        return Response.json({
          message : "Users fetch Successfully 😍",
          data : users
      },{
          status : 200,
          
      })
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
      await  authMiddleware(request as NextRequest)
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


export async function promoteToTeacher(id: string, request: NextRequest) {
  try {
    await dbConnect();

    
    await  authMiddleware(request as NextRequest)

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found 😴" }, { status: 404 });
    }

    if (user.role === Role.Admin) {
      return NextResponse.json(
        { message: "You cannot perform this action 😒" },
        { status: 403 }
      );
    }

    if (user.role === Role.Student) {
      user.role = Role.Teacher;
      await user.save();
      return NextResponse.json(
        { message: "User promoted to teacher successfully 🥰", user },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "User is already a teacher. No changes made." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error promoting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error 😩" },
      { status: 500 }
    );
  }
}
