"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Clock, Tag, User } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchCourses } from '@/store/courses/courseSlice'

const Courses = () => {
    const {courses} = useAppSelector((state)=>state.courses)
    const filteredCourses = courses.slice(0, 3);
    const dispatch = useAppDispatch()
      useEffect(()=>{
        dispatch(fetchCourses())
      },[dispatch])
  return (
    <section className="container space-y-16 py-24 md:py-32">
        <div>
        <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-[1.1]">Trending Courses</h2>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredCourses.length > 0 ? filteredCourses.map((course) => (
          <Card key={course._id} className="overflow-hidden">
            <Image
              height={192}
              width={384}
              src={course.thumbnail ? course.thumbnail : '/placeholder.png'}
              alt={course.courseName}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <h3 className="text-lg sm:text-xl font-semibold">{course.courseName}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{course.courseDescription}</p>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.courseDuration}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {course.category.name}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {course.mentor.username}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-base sm:text-lg font-bold">Rs.{course.coursePrice}</p>
            </CardFooter>
          </Card>
        )) : (
          <div className="col-span-3 flex items-center justify-center py-12">
            <p className="text-gray-600 text-sm sm:text-base">No courses found.</p>
          </div>
        )}
      </div>
        </div>
      </section>  )
}

export default Courses
