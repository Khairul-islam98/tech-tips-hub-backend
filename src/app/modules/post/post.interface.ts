import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  authorId: Types.ObjectId;
  comments: Types.ObjectId[];
  images: string[];
  category: string;
  isPremium: boolean;
  upvotes?: Types.ObjectId[];
  downvotes?: Types.ObjectId[];
}
