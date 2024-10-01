import { Types } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
  authorId: Types.ObjectId;
  comments: Types.ObjectId[];
  images: string[];
  category: string;
  isPremium: boolean;
  upvotes?: number;
  downvotes?: number;
}
