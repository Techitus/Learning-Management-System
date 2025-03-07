/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Video, PlusCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import { createLesson, deleteLesson, fetchLessons,  } from "@/store/Lessons/lessonSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast, { Toaster } from "react-hot-toast";

export default function LessonsTab({ isLessonTabEnable = true }: { isLessonTabEnable?: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const dispatch = useAppDispatch();
  const data = useParams();
  const courseId = data.id;
  const { lessons } = useAppSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessons(courseId as string));
  }, [courseId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!title || !description ) {
      alert("Please fill all fields and select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoUrl", videoFile as File); 
    formData.append("ytVideoUrl", videoUrl);
    formData.append("course", courseId as string);

    dispatch(createLesson(formData)).then(() => {
      setIsDialogOpen(false);
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setVideoFile(null);
    });
    toast.success("Lesson uploaded successfully!", {
      style: {
        borderRadius: "10px",
        background: "#000",
        color: "#fff",
      },
    });
  };

  

  function handleDelete(lessonId: string): void {
    dispatch(deleteLesson(lessonId))
     .then(() => {
      toast.success("Lesson deleted successfully!", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });      })
    }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson._id} className="overflow-hidden">
            <CardHeader className="relative pb-0">
              <div className="absolute top-2 right-2">
                {isLessonTabEnable && (
                  <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-5 w-5 -mt-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the selected item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(lesson._id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                )}
              </div>
              {
                lesson.videoUrl ? (
                  <video
                  width={320}
                  height={240}
                  controls
                  controlsList="nodownload"
                  preload="none"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full rounded-t-lg"
                >
                  <source
                    src={lesson.videoUrl }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                ): lesson.ytVideoUrl ? (
                  <iframe width="full"
                  height={260} src={lesson.ytVideoUrl} allowFullScreen />
                ) : (
                  <p>No video available</p>
                )}
              
               
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-xl mb-2">{lesson.title}</CardTitle>
              <p className="text-muted-foreground line-clamp-2">{lesson.description}</p>
            </CardContent>
          </Card>
        ))}

        {isLessonTabEnable && (
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
                <DialogDescription>Add a new video lesson to your course.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter lesson title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter lesson description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Textarea id="videoUrl" placeholder="Enter url of your video" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="video">Video</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
                    <Video className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag and drop your video file here or click to browse</p>
                    <Input id="video" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('video')?.click()}>
                      Select Video
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleUpload}>Upload Lesson</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Toaster  position="bottom-right"
  reverseOrder={false} />
    </div>
  );
}
