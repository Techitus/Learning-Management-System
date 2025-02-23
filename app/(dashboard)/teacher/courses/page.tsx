/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  Clock, Tag, } from "lucide-react";
import { useState, } from "react";
import Image, { StaticImageData } from "next/image";
import web from '@/Images/web.jpeg'
import app from '@/Images/app.jpeg'

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "UI/UX Design",
  "DevOps",
];


type Course = {
  id: number;
  name: string;
  price: string;
  description: string;
  duration: string;
  category: string;
  image: any;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Modern Web Development",
      price: "99.99",
      description: "Learn modern web development with React and Next.js",
      duration: "12 weeks",
      category: "Web Development",
      image: web,
    },
    {
      id: 2,
      name: "iOS App Development",
      price: "149.99",
      description: "Build iOS apps with Swift",
      duration: "16 weeks",
      category: "Mobile Development",
      image: app,
    },
    {
        id: 3,
        name: "Modern Web Development",
        price: "99.99",
        description: "Learn modern web development with React and Next.js",
        duration: "12 weeks",
        category: "Web Development",
        image: web,
      },
      {
        id: 4,
        name: "iOS App Development",
        price: "149.99",
        description: "Build iOS apps with Swift",
        duration: "16 weeks",
        category: "Mobile Development",
        image: app,
      },
      {
        id: 5,
        name: "Modern Web Development",
        price: "99.99",
        description: "Learn modern web development with React and Next.js",
        duration: "12 weeks",
        category: "Web Development",
        image: web,
      },
      {
        id: 6,
        name: "iOS App Development",
        price: "149.99",
        description: "Build iOS apps with Swift",
        duration: "16 weeks",
        category: "Mobile Development",
        image: app,
      },
      {
        id: 7,
        name: "Modern Web Development",
        price: "99.99",
        description: "Learn modern web development with React and Next.js",
        duration: "12 weeks",
        category: "Web Development",
        image: web,
      },
      {
        id: 8,
        name: "iOS App Development",
        price: "149.99",
        description: "Build iOS apps with Swift",
        duration: "16 weeks",
        category: "Mobile Development",
        image: app,
      },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "none">("none");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  

  

  

  const filteredCourses = courses
    .filter((course) =>
      selectedCategory === "all" ? true : course.category === selectedCategory
    )
    .sort((a, b) => {
      if (priceSort === "asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      if (priceSort === "desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue className='cursor-pointer' placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem  key={category} value={category} className="cursor-pointer">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceSort} onValueChange={(value: "asc" | "desc" | "none") => setPriceSort(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="none">Default</SelectItem>
              <SelectItem className="cursor-pointer" value="asc">Price: Low to High</SelectItem>
              <SelectItem className="cursor-pointer" value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <Image height={0} width={0}
              src={course.image}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <h3 className="text-xl font-semibold">{course.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {course.category}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-lg font-bold">${course.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
