import { model, Schema } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Comment = model<IComment>('Comment', commentSchema);
