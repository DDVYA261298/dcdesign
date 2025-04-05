import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  projectType: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'responded'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
