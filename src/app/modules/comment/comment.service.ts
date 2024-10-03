/* eslint-disable @typescript-eslint/no-explicit-any */
import { Comment } from './comment.model';
import { IComment } from './comment.interface';
import { Post } from '../post/post.model';
import { User } from '../user/user.model';

// Function to create a new comment
const createCommentIntoPost = async (payload: IComment) => {
  const { userId, postId } = payload;

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  try {
    const newComment = await Comment.create(payload);

    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment._id },
      },
      { new: true },
    );

    return newComment;
  } catch (error: any) {
    throw new Error(`Error creating comment: ${error.message}`);
  }
};

const editComment = async (id: string, payload: Partial<IComment>) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error('Comment not found');
  }

  const result = await Comment.findByIdAndUpdate(
    id,
    { content: payload.content, updatedAt: new Date() },
    { new: true },
  );

  await Post.findByIdAndUpdate(
    comment.postId,
    { updatedAt: new Date() },
    { new: true },
  );

  return result;
};
// Function to delete a comment
const deleteComment = async (commentId: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }

  await comment.deleteOne();

  await Post.findByIdAndUpdate(
    comment.postId,
    {
      $pull: { comments: commentId },
    },
    { new: true },
  );

  return comment;
};

const getCommentByPostId = async (postId: string) => {
  const result = await Comment.find({ postId }).populate('userId');
  return result;
};

export const CommentServices = {
  createCommentIntoPost,
  editComment,
  deleteComment,
  getCommentByPostId,
};
