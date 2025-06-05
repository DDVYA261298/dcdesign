"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

interface ProjectFormProps {
  onSubmit: (formData: FormData) => void;
}

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    client: "",
    location: "",
    status: "ongoing",
    featured: false,
  });
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, featured: target.checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files as FileList);
    setImages(selectedFiles);
  };

    const uploadImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");

    return data.url; // S3 public URL
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const uploadedImageUrls = await Promise.all(
      images.map((file) => uploadImageToS3(file))
    );

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    uploadedImageUrls.forEach(url => formData.append("images", url));

    await onSubmit(formData);
    toast.success("✅ Project submitted successfully!");
  } catch (err) {
    console.error("Form submit failed:", err);
    toast.error("❌ Submission failed. Please try again.");
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Title</Label>
        <Input name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Client</Label>
        <Input name="client" value={form.client} onChange={handleChange} required />
      </div>
      <div>
        <Label>Location</Label>
        <Input name="location" value={form.location} onChange={handleChange} required />
      </div>
      <div>
        <Label>Status</Label>
        <select
          name="status"
          value={form.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setForm((prev) => ({ ...prev, status: e.target.value }))
          }
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={form.featured}
          onChange={handleCheckbox}
        />
        <Label htmlFor="featured">Featured</Label>
      </div>
      <div>
        <Label>Project Images</Label>
        <Input type="file" name="images" multiple onChange={handleImageChange} />
                {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {images.map((file, index) => (
            <div key={index} className="border rounded overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
