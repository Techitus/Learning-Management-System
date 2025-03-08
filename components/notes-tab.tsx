/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, FileText, PlusCircle, AlertTriangle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import { createNotes, deleteNote, fetchNotes, resetStatus, } from "@/store/Notes/noteSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Status } from "@/types/status.types";
import { ClockLoader } from "react-spinners";

export interface INotes {
    _id?: string,
    attachment: string | File,
    course: string,
}

export default function NotesTab({ addNoteEnable = true }: { addNoteEnable?: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | undefined>(undefined);
  
  const dispatch = useAppDispatch();
  const data = useParams();
  const courseId = typeof data.id === 'string' ? data.id : Array.isArray(data.id) ? data.id[0] : '';
  const { notes,status } = useAppSelector((state) => state.notes);
  
  const [note, setNote] = useState<INotes>({
    course: courseId,
    attachment: ""
  });
  
  useEffect(() => {
    if (courseId) {
      dispatch(fetchNotes(courseId));
    }
  }, [courseId]);
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
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select a PDF file to upload");
      return;
    }
    
    const formData = new FormData();
    formData.append("attachment", selectedFile);
    formData.append("course", courseId);
    
    dispatch(createNotes(formData));
    
    toast.success("Notes upload started", {
      style: {
        borderRadius: "10px",
        background: "#000",
        color: "#fff",
      },
    });
    
    setIsDialogOpen(false);
    setSelectedFile(null);
    setSelectedFileName("");
    dispatch(resetStatus());
  };

  const handleDeleteClick = (noteId: string | undefined) => {
    if (!noteId) return;
    setNoteToDelete(noteId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      dispatch(deleteNote(noteToDelete));
      toast.success("Note deleted successfully", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
    }
    setIsDeleteDialogOpen(false);
    setNoteToDelete(undefined);
  };
  
  const handleDownload = (attachment: string) => {
    const link = document.createElement("a");
    link.href = attachment;
    link.download = attachment.split("/").pop() || "note.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
   
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {notes.map((note) => (
          <Card key={note._id} className="flex flex-col h-full overflow-hidden">
            <CardHeader className="relative p-3 pb-0 flex-shrink-0">
              <div className="absolute top-1 right-1 z-10">
                {
                  addNoteEnable && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteClick(note._id)}
                    >
                      <Trash2 className="h-4 w-4 -mt-5" />
                    </Button>
                  )
                }
                 
                
              </div>
              <div className="bg-muted aspect-square rounded-md flex items-center justify-center ">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-2 flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2 break-all">
                {note.attachment.split('-').pop()}
              </p>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-xs h-8" 
                onClick={() => handleDownload(note.attachment)}
              >
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {addNoteEnable && (
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Card className="flex flex-col h-full overflow-hidden border-dashed cursor-pointer hover:bg-muted/50 transition-colors items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center h-full p-4">
          <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground font-medium text-center">
            Upload New Notes
          </p>
        </CardContent>
      </Card>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Upload New Notes</DialogTitle>
        <DialogDescription>
          Add new PDF notes to your course. Fill in the details below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="pdf">PDF Document</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
              <FileText className="h-8 w-8 text-muted-foreground" />
              {selectedFileName ? (
                <p className="text-sm font-medium">{selectedFileName}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Drag and drop your PDF file here or click to browse
                </p>
              )}
              <Input
                onChange={handleFileChange}
                id="pdf"
                name="attachment"
                type="file"
                accept=".pdf"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("pdf")?.click()}
              >
                Select PDF
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!selectedFile}>
            Upload Notes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)}


        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this note? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setNoteToDelete(undefined)}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}