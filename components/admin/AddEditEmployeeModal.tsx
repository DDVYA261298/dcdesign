"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface AddEditEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    _id?: string;
    name: string;
    department: string;
    role: string,        
    bio: string;
    image?: string;
  } | null;
  onSuccess: () => Promise<void>;
}

const toast = {
    success: (msg: string) => alert(msg),
    error: (msg: string) => alert(msg),
  };
export default function AddEditEmployeeModal({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}: AddEditEmployeeModalProps) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",        
    bio: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        department: initialData.department,
        role: initialData.role,       
        bio: initialData.bio
      });
    } else {
      setForm({ name: "", department: "", role: "", bio: "" });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(
        initialData?._id ? `/api/employees/${initialData._id}` : "/api/employees",
        {
          method: initialData?._id ? "PUT" : "POST",
          body: formData,
        }
      );

      if (res.ok) {
        toast.success(`Employee ${initialData?._id ? "updated" : "created"} successfully.`);
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error("Failed to save employee.");
      }
    } catch (error) {
      toast.error("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData?._id ? "Edit Employee" : "Add Employee"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Input name="role" value={form.role} onChange={handleChange} required />
          </div>


          <div>
            <Label htmlFor="department">Department</Label>
            <Input name="department" value={form.department} onChange={handleChange} required />
          </div>
         
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea name="bio" value={form.bio} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {initialData?.image && (
              <Image
                src={initialData.image}
                alt="Employee"
                width={80}
                height={80}
                className="mt-2 rounded border"
              />
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Employee"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
