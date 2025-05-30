"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddEditReviewModal from "./AddEditReviewModal";

interface Review {
  _id: string;
  clientName: string;
  text: string;
  rating: number;
  project: {
    _id: string;
    title: string;
  };
}

interface ReviewFormData {
  _id?: string;
  clientName: string;
  text: string;
  rating: number;
  project: string;
}

interface Project {
  _id: string;
  title: string;
}

export default function ReviewsTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<ReviewFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    fetchReviews();
    fetchProjects();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (res.ok) fetchReviews();
  };

  const openCreateModal = () => {
    setMode("create");
    setSelectedReview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (review: Review) => {
    setMode("edit");
    setSelectedReview({
      _id: review._id,
      clientName: review.clientName,
      text: review.text,
      rating: review.rating,
      project: review.project._id,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Client Reviews</h2>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Review
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Project</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-t">
                  <td className="px-4 py-2">{review.clientName}</td>
                  <td className="px-4 py-2">{review.rating}</td>
                  <td className="px-4 py-2">{review.text}</td>
                  <td className="px-4 py-2">{review.project?.title || "-"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(review)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(review._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddEditReviewModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={selectedReview}
        projectId={selectedReview?.project || projects[0]?._id || ""}
        onSuccess={fetchReviews}
        projects={projects}
      />
    </div>
  );
}
