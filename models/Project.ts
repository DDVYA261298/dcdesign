import "@/models/Employee"; // ✅ Forces Mongoose to register the Employee model

import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  status: 'ongoing' | 'completed';
  category: {
    type: String,
    enum: ["Residential", "Commercial", "Hospitality", "Office"],
    required: true
  },
  images: string[];
  videos: string[];
  featured: boolean;
  client: string;
  location: string;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      required: true,
      enum: ['ongoing', 'completed'],
      default: 'ongoing'
    },
    category: {
      type: String,
      enum: ["Residential", "Commercial", "Hospitality", "Office"],
      required: true
    },
    images: [{ type: String }],
    videos: [{ type: String }],
    featured: { type: Boolean, default: false },
    client: { type: String, required: true },
    location: { type: String, required: true },
    completedDate: { type: Date },
    employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);