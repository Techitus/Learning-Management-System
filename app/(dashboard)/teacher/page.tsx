"use client"

import {  Users,  Activity, BookOpen, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import Notifications from "@/components/notification-card"
import { UserChart } from "@/components/teacher-dashboard-chart"
import DateTimeCard from "@/components/date-time"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Role } from "@/database/models/user.schema"
import { useEffect } from "react"
import { fetchCourses } from "@/store/courses/courseSlice"
import { fetchUsers } from "@/store/users/userSlice"
import { useSession } from "next-auth/react"

export default function StudentDashboard() {
  const dispatch = useAppDispatch()
  const {courses} = useAppSelector((state)=>state.courses)
    const { data: session } = useSession();
  
  const {users} = useAppSelector((state)=>state.users)
  const students = users.filter(user=>user.role === Role.Student)
const myCourses = courses.filter(course=>course.mentor._id === session?.user?.id)
const totalRevenue = myCourses.reduce((sum, course) => {
  const coursePrice = parseFloat(course.coursePrice); 
  const revenueForCourse = coursePrice * students.length
  return sum + revenueForCourse; 
}, 0);
useEffect(()=>{
dispatch(fetchCourses())
dispatch(fetchUsers())
},[dispatch])

  return (
    <div className="space-y-6 ">
       <div className='md:flex space-y-6 md:space-y-0 justify-between items-center'>
       <div>
          <h1 className='text-white text-4xl text-center md:text-start'>Dashboard</h1>
        </div>
       <div >
        <DateTimeCard/>
       
       </div>

       </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
       
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
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+12% from last term</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6 xl:space-y-0 xl:flex w-full gap-10">
  <div className="w-full xl:w-3/5 min-h-[300px]">
    <UserChart />
  </div>
  <div className="w-full xl:w-2/5 2xl:space-y-7">
    <Notifications />
  </div>
</div>


    </div>
  )
}