/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCategory, fetchCategories, resetStatus, updateCategory, deleteCategory } from "@/store/category/categorySlice";
import { Status } from "@/types/status.types";
import toast, { Toaster } from "react-hot-toast";

interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
  const [prevCategoriesLength, setPrevCategoriesLength] = useState(categories.length);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (status === Status.SUCCESS) {
      if (editingCategory) {
        toast.success("Category updated successfully!", {
          style: {
            borderRadius: "10px",
            background: "#000",
            color: "#fff",
          },
        });
      } else if (name.trim()) {
        toast.success("Category added successfully!", {
          style: {
            borderRadius: "10px",
            background: "#000",
            color: "#fff",
          },
        });
      }
      setIsOpen(false);
      setCategoryName("");
      setEditingCategory(null);
      dispatch(resetStatus());
    }
  }, [status, dispatch, editingCategory, name]);

  useEffect(() => {
    if (status === Status.SUCCESS && categories.length < prevCategoriesLength) {
      toast.success("Category deleted successfully!", {
        style: {
          borderRadius: "10px",
          background: "#000",
          color: "#fff",
        },
      });
      setPrevCategoriesLength(categories.length);
      dispatch(resetStatus());
    }
  }, [status, dispatch, categories, prevCategoriesLength]);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createCategory({ name }));
    }
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory && name.trim()) {
      dispatch(
        updateCategory({
          id: editingCategory._id,
          name: name.trim(),
        })
      );
    }
  };

  const handleDeleteCategory = (id: string) => {
    setPrevCategoriesLength(categories.length);
    dispatch(deleteCategory(id));
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setIsOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl xl:text-3xl font-bold text-white">Categories</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategory(null);
                setCategoryName("");
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}>
              <div className="py-4">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={name}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">
                  {editingCategory ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-black/30 rounded-lg shadow">
        <div className="divide-y divide-gray-600">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between p-4 hover:bg-black/50"
            >
              <span className="text-lg text-white/90">{category.name}</span>
              <div className="flex items-center gap-4 text-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(category)}
                >
                  <Pencil className="h-4 w-4 text-white/90" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Category</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{category.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-white bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
