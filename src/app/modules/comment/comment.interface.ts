import { Types } from 'mongoose';

export interface IComment {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  content: string;
}
