import { Types } from 'mongoose';

export interface INotification {
  userId: Types.ObjectId;
  type: string;
  message: string;
  postId: Types.ObjectId;
}
