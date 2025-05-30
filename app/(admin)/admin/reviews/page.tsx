import { Metadata } from "next";
import Link from "next/link";
import ReviewsTable from "@/components/admin/ReviewsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Reviews | Admin",
  description: "Manage client reviews",
};

export default function AdminReviews() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-3xl font-bold text-gray-900">Client Reviews</h1> */}
        {/* <Link href="/admin/reviews/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Review</span>
          </Button>
        </Link> */}
      </div>
      
      <ReviewsTable />
    </div>
  );
}