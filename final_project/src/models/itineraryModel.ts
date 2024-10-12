import mongoose, { Document, Schema } from 'mongoose';

export interface ItineraryItem extends Document {
  title: string;
  date: Date;
  location: string;
  description?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryItemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the itinerary item'],
    },
    date: {
      type: Date,
      required: [true, 'Please add a date for the itinerary item'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location for the itinerary item'],
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model<ItineraryItem>('ItineraryItem', ItineraryItemSchema);
