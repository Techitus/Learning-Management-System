"use client"

import {  Users,  Activity, BookOpen, GraduationCap } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import DateTimeCard from "@/components/date-time"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Role } from "@/database/models/user.schema"
import { useEffect } from "react"
import { fetchCourses } from "@/store/courses/courseSlice"
import { fetchUsers } from "@/store/users/userSlice"
import { useSession } from "next-auth/react"
import { Clock, Tag, User } from 'lucide-react'
import Image from "next/image"

export default function StudentDashboard() {
  const dispatch = useAppDispatch()
  const {courses} = useAppSelector((state)=>state.courses)
    const { data: session } = useSession();
  
  const {users} = useAppSelector((state)=>state.users)
  const teacher = users.filter(user=>user.role === Role.Teacher)
const myCourses = courses.filter(course=>course._id === session?.user?.id)
const totalExpenses = myCourses.reduce((sum, course) => {
  const coursePrice = parseFloat(course.coursePrice); 
  const expensesForCourse = coursePrice * myCourses.length
  return sum + expensesForCourse; 
}, 0);
useEffect(()=>{
dispatch(fetchCourses())
dispatch(fetchUsers())
},[dispatch])
    const filteredCourses = courses.slice(0, 3);
  return (
    <div className="space-y-6">
  <div className="md:flex space-y-6 md:space-y-0 justify-between items-center">
    <div>
      <h1 className="text-white text-4xl text-center md:text-start">Dashboard</h1>
    </div>
    <div>
      <DateTimeCard />
    </div>
  </div>

  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
        <GraduationCap className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{courses.length}</div>
        <p className="text-xs text-muted-foreground">+20% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">My Courses</CardTitle>
        <BookOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{myCourses.length}</div>
        <p className="text-xs text-muted-foreground">+5 new this month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{teacher.length}</div>
        <p className="text-xs text-muted-foreground">+3 this month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses </CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalExpenses}</div>
        <p className="text-xs text-muted-foreground">+12% from last term</p>
      </CardContent>
    </Card>
  </div>

  <div className="space-y-4 w-full px-4 md:px-0">
      <h1 className="text-white text-2xl md:text-3xl lg:text-4xl text-center md:text-start font-bold">
        Trending Courses
      </h1>
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCourses.map((course) => (
            <Card key={course._id} className="overflow-hidden flex flex-col h-full">
              <div className="relative w-full h-40 sm:h-48">
                <Image
                  fill
                  src={course.thumbnail ? course.thumbnail : '/placeholder.png'}
                  alt={course.courseName}
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2">
                  {course.courseName}
                </h3>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3">
                  {course.courseDescription}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="truncate max-w-[80px]">{course.courseDuration}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="truncate max-w-[80px]">{course.category.name}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="truncate max-w-[80px]">{course.mentor.username}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 ">
                <p className="text-sm sm:text-base lg:text-lg font-bold">Rs.{course.coursePrice}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-6 sm:py-12">
          <p className="text-gray-600 text-sm sm:text-base">No courses found.</p>
        </div>
      )}
    </div>

</div>



  )
}