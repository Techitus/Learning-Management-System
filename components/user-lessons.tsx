"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NotesTab from "@/components/notes-tab";
import LessonsTab from "@/components/lesson-tab";


export default function LessonLists() {
   
  return (
    <Tabs defaultValue="lessons" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <TabsList>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="lessons" className="absolute right-4 top-[7.5rem]">
          
        </TabsContent>
       
      </div>
      
      <TabsContent value="lessons" className="mt-8">
        <LessonsTab isLessonTabEnable={false} />
      </TabsContent>
      
      <TabsContent value="notes" className="mt-8">
        <NotesTab addNoteEnable={false} />
      </TabsContent>
    </Tabs>
  );
}