"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
  
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, typeof value === "boolean" ? String(value) : value.toString());
      }
    });
  
    images.forEach((file) => formData.append("images", file));
    onSubmit(formData);
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
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
