"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AddEditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    _id?: string;
    title: string;
    client: string;
    status: string;
    category: string;
    location: string;
    date: string;
    description?: string;
  } | null;
  onSuccess: () => Promise<void>;
}

const toast = {
  success: (msg: string) => alert(msg),
  error: (msg: string) => alert(msg),
};

export default function AddEditProjectModal({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}: AddEditProjectModalProps) {
  const [form, setForm] = useState({
    title: "",
    client: "",
    status: "ongoing",
    category: "",
    location: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        client: initialData.client,
        status: initialData.status,
        category: initialData.category || "",
        location: initialData.location,
        date: initialData.date,
        description: initialData.description || "",
      });
    } else {
      setForm({
        title: "",
        client: "",
        status: "ongoing",
        category: "",
        location: "",
        date: "",
        description: "",
      });
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFiles(Array.from(e.target.files));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setVideoFiles(Array.from(e.target.files));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("client", form.client);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("status", form.status);
    formData.append("completedDate", form.date);
    imageFiles.forEach((file) => formData.append("images", file));
    videoFiles.forEach((file) => formData.append("videos", file));

    const xhr = new XMLHttpRequest();
    xhr.open(
      initialData?._id ? "PUT" : "POST",
      initialData?._id ? `/api/projects/${initialData._id}` : "/api/projects"
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      setLoading(false);
      if (xhr.status === 200 || xhr.status === 201) {
        toast.success(`Project ${initialData?._id ? "updated" : "created"} successfully.`);
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error("Failed to save project.");
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      toast.error("Unexpected upload error.");
    };

    xhr.send(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>Edit Project</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData?._id ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="client">Client</Label>
            <Input name="client" value={form.client} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select a category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Office">Office</option>
            </select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input name="location" value={form.location} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
              <Label htmlFor="images">Project Images</Label>
              <Input type="file" accept="image/*" multiple onChange={handleImageChange} />
            </div>

            <div>
              <Label htmlFor="videos">Project Videos</Label>
                  <Input type="file" accept="video/*" multiple onChange={handleVideoChange} />
            </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </div>


          {progress > 0 && progress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? `Uploading (${progress}%)...` : "Save Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
