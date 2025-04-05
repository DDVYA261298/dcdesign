import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
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
  images: [String]
});

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
