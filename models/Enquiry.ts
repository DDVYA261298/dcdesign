import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
