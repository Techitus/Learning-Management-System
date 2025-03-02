/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Tag, User, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCourses } from "@/store/courses/courseSlice";
import { fetchCategories } from "@/store/category/categorySlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Mentor = {
  _id: string;
  username: string;
};

type Category = {
  _id: string;
  name: string;
};

type ICourses = {
  _id?: string;
  courseName: string;
  coursePrice: string;
  courseDescription: string;
  courseDuration: string;
  category: Category;
  mentor: Mentor;
  thumbnail: any;
};

type CoursesTeacherProps = {
  showBuyButton: boolean;
};

export default function CoursesTeacher({ showBuyButton = false }: CoursesTeacherProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "none">("none");
  const dispatch = useAppDispatch();

  const { courses } = useAppSelector((state) => state.courses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const { categories } = useAppSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCourses = courses
    .filter((course) =>
      selectedCategory === "all" ? true : course.category.name === selectedCategory
    )
    .sort((a, b) => {
      if (priceSort === "asc") {
        return parseFloat(String(a.coursePrice)) - parseFloat(String(b.coursePrice));
      }
      if (priceSort === "desc") {
        return parseFloat(String(b.coursePrice)) - parseFloat(String(a.coursePrice));
      }
      return 0;
    });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue className="cursor-pointer" placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.name} className="cursor-pointer">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceSort} onValueChange={(value: "asc" | "desc" | "none") => setPriceSort(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="none">
                Default
              </SelectItem>
              <SelectItem className="cursor-pointer" value="asc">
                Price: Low to High
              </SelectItem>
              <SelectItem className="cursor-pointer" value="desc">
                Price: High to Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course._id} className="overflow-hidden">
              <Image
                height={192}
                width={384}
                src={course.thumbnail ? course.thumbnail : "/placeholder.png"}
                alt={course.courseName}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
              <Link href={`/teacher/courses/${course._id}`}>
                  <h3 className="text-xl font-semibold">{course.courseName}</h3>
                </Link>              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-gray-600 mb-4">{course.courseDescription}</p>
                <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500">
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
                <p className="text-lg font-bold">Rs.{course.coursePrice}</p>
                {showBuyButton && (
                  <Button variant="default" className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Buy Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center py-12">
            <p className="text-gray-600">No courses found.</p>
          </div>
        )}
      </div>
    </div>
  );
}