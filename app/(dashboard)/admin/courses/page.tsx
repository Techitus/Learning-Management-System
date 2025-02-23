/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Clock, Tag, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string(),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  image: z.instanceof(File, { message: "Image is required" }).optional(),
});

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
      description: "Build iOS apps with uild iOS apps with Swift hahaah",
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
        description: "Build iOS apps with uild iOS apps with Swift hahaah",
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
        description: "Build iOS apps with uild iOS apps with Swift hahaah",
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
        description: "Build iOS apps with uild iOS apps with Swift hahaah",
        duration: "16 weeks",
        category: "Mobile Development",
        image: app,
      },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "none">("none");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      duration: "",
      category: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const imageUrl = imagePreview || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";
    const newCourse: Course = {
      id: courses.length + 1,
      ...values,
      image: imageUrl,
    };
    setCourses([...courses, newCourse]);
    form.reset();
    setImagePreview(null);
  };

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
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer"value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem  key={category} value={category}>
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
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="99.99"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          disabled={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter course description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12 weeks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Add Course
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
