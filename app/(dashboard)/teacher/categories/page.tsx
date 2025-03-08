/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { fetchCategories } from "@/store/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Status } from "@/types/status.types";
import { useEffect } from "react";
import { ClockLoader } from "react-spinners";



export default function Home() {
  const dispatch = useAppDispatch()
 const {categories,status} = useAppSelector((state)=>state.categories)
 console.log(categories)
 useEffect(()=>{
  dispatch(fetchCategories())
 },[])

useEffect(()=>{
  if(status === Status.LOADING){
    <div>
<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-green-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-green-300/10 blur-[100px]" />
            <div className="h-screen flex items-center justify-center ">
      <ClockLoader color="#ffffff" />
    </div>
    </div>
  }
},[status])
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        
      </div>

      <div className="bg-black/30 rounded-lg shadow">
        <div className="divide-y divide-gray-600  justify-between">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center  justify-between p-4 hover:bg-black/50"
            >
              <span className="text-lg  text-white/90">{category.name}</span>
              
            </div>
          ))}
          {categories.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No categories found. Inform Admin to Add Categories.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}