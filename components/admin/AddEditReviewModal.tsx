"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AddEditReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    _id?: string;
    clientName: string;
    text: string;
    rating: number;
    project: string;
  } | null;
  projectId: string;
  onSuccess: () => Promise<void>;
  projects: { _id: string; title: string }[];
}


export default function AddEditReviewModal({ open, onOpenChange, initialData, projectId, onSuccess, projects }: AddEditReviewModalProps) {
  const [form, setForm] = useState({
    clientName: "",
    text: "",
    rating: 5,
    project: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        clientName: initialData.clientName,
        text: initialData.text,
        rating: initialData.rating,
        project: initialData.project
      });
    } else {
      setForm({
        clientName: "",
        text: "",
        rating: 5,
        project: projectId || projects[0]?._id || ""
      });    }
  }, [initialData, projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "rating" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(initialData?._id ? `/api/reviews/${initialData._id}` : "/api/reviews", {
        method: initialData?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        // toast.success(`Review ${initialData?._id ? "updated" : "created"} successfully.`);
        onSuccess();
        onOpenChange(false);
      } else {
        // toast.error("Failed to save review.");
      }
    } catch (error) {
      // toast.error("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData?._id ? "Edit Review" : "Add Review"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="project">Project</Label>
            {projects.length > 0 ? (
  <select
    name="project"
    value={form.project}
    onChange={handleChange}
    required
    className="w-full border rounded px-3 py-2"
  >
    {projects.map((p) => (
      <option key={p._id} value={p._id}>{p.title}</option>
    ))}
  </select>
) : (
  <p className="text-sm text-red-500">No projects available</p>
)}
          </div>

          <div>
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              type="number"
              name="rating"
              min={1}
              max={5}
              value={form.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="text">Review</Label>
            <Textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
