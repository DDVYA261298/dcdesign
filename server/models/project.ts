import mongoose from 'mongoose';

// Define the Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  client: String,
  description: String,
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  date: String,
  image: String,
  category: String,
  year: Number,
  location: String,
  services: [String],
  images: [String],
});

// Create and export the Project model
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
