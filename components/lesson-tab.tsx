/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Video, PlusCircle } from "lucide-react";

export default function LessonsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to React", description: "Learn the basics of React", videoUrl: "https://example.com/video1.mp4" },
    { id: 2, title: "Advanced JavaScript", description: "Deep dive into JavaScript concepts", videoUrl: "https://example.com/video2.mp4" },
  ]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden">
            <CardHeader className="relative pb-0">
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-5 w-5 -mt-3" />
                </Button>
              </div>
              <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
                <Video className="h-12 w-12 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-xl mb-2">{lesson.title}</CardTitle>
              <p className="text-muted-foreground line-clamp-2">{lesson.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Watch Lesson</Button>
            </CardFooter>
          </Card>
        ))}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="overflow-hidden border-dashed cursor-pointer hover:bg-muted/50 transition-colors flex flex-col items-center justify-center h-full min-h-[300px]">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">Upload New Lesson</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload New Lesson</DialogTitle>
              <DialogDescription>
                Add a new video lesson to your course. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter lesson title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter lesson description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="video">Video</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
                  <Video className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drag and drop your video file here or click to browse</p>
                  <Input id="video" type="file" accept="video/*" className="hidden" />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('video')?.click()}>
                    Select Video
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button>Upload Lesson</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}