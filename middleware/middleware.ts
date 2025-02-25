// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@/database/models/user.schema";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Get the token from the request
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // Create URL objects for redirects
  const loginUrl = new URL('/api/auth/signin', request.url);
  const unauthorizedUrl = new URL('/unauthorized', request.url);
  
  // Add the callback URL to redirect back after login
  loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
  
  // If no token and trying to access protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  // Get the user role from the token
  const userRole = token.role as Role;
  
  // Check route access based on role
  if (path.startsWith('/admin') && userRole !== Role.Admin) {
    console.log('Unauthorized access to admin route:', path, 'by user with role:', userRole);
    return NextResponse.redirect(unauthorizedUrl);
  }
  
  if (path.startsWith('/teacher') && 
      userRole !== Role.Teacher && 
      userRole !== Role.Admin) {
    console.log('Unauthorized access to teacher route:', path, 'by user with role:', userRole);
    return NextResponse.redirect(unauthorizedUrl);
  }
  
  if (path.startsWith('/student') && 
     !(userRole === Role.Student || 
       userRole === Role.Teacher || 
       userRole === Role.Admin)) {
    console.log('Unauthorized access to student route:', path, 'by user with role:', userRole);
    return NextResponse.redirect(unauthorizedUrl);
  }
  
  // If the user is authorized or accessing a public route, allow the request
  return NextResponse.next();
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/api/admin/:path*',
    '/api/teacher/:path*',
    '/api/student/:path*'
  ],
};