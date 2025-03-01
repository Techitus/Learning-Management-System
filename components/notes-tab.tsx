/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, FileText, PlusCircle } from "lucide-react";

export default function NotesTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState([
    { id: 1, title: "React Fundamentals", description: "Comprehensive notes on React basics", fileUrl: "https://example.com/notes1.pdf" },
    { id: 2, title: "JavaScript ES6 Features", description: "Notes covering all ES6 features", fileUrl: "https://example.com/notes2.pdf" },
  ]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="overflow-hidden">
            <CardHeader className="relative pb-0">
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-5 w-5 -mt-3" />
                </Button>
              </div>
              <div className="bg-muted aspect-[3/4] rounded-md flex items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-xl mb-2">{note.title}</CardTitle>
              <p className="text-muted-foreground line-clamp-2">{note.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Download PDF</Button>
            </CardFooter>
          </Card>
        ))}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="overflow-hidden border-dashed cursor-pointer hover:bg-muted/50 transition-colors flex flex-col items-center justify-center h-full min-h-[300px]">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">Upload New Notes</p>
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter notes title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter notes description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pdf">PDF Document</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drag and drop your PDF file here or click to browse</p>
                  <Input id="pdf" type="file" accept=".pdf" className="hidden" />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('pdf')?.click()}>
                    Select PDF
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button>Upload Notes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}