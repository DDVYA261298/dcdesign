// models/Employee.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  role: string;
  department: string;
  bio: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true }, // ✅ this is the main one
    bio: { type: String, required: true },
    image: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);
