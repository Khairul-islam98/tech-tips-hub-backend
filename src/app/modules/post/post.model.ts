import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 0,
      },
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 0,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost>('Post', postSchema);
