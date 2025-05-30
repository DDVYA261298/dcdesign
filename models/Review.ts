import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  clientName: string;
  text: string;
  rating: number;
  image?: String,
  project: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    clientName: { type: String, required: true },
    text: { type: String, required: true },
    rating: { 
      type: Number, 
      required: true,
      min: 1,
      max: 5
    },
    image: {  
      type: String,
      required: false  
    },
    project: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);