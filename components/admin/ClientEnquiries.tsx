"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ClientEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    if (res.ok) fetchEnquiries();
  };

  const markAsRead = async (id: string) => {
    const res = await fetch(`/api/enquiries/${id}/read`, { method: "PATCH" });
    if (res.ok) fetchEnquiries();
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const unreadCount = enquiries.filter((e) => !e.isRead).length;

  return (
    <Card className="max-h-[320px] overflow-y-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Client Enquiries</span>
          <p className="text-sm text-gray-500">
            {unreadCount} new message{unreadCount !== 1 ? "s" : ""}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-sm text-gray-500">No enquiries found.</p>
        ) : (
          enquiries.map((e) => (
            <div
              key={e._id}
              className={`border-b pb-3 ${e.isRead ? "opacity-60" : ""}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{e.name}</p>
                  <p className="text-sm text-gray-500">{e.email}</p>
                  <p className="text-sm">{e.message}</p>
                </div>
                <div className="flex gap-2 ml-2">
                    


                  {!e.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsRead(e._id)}
                      title="Mark as Read"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(e._id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
