import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

// Controller to create a new comment
const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentIntoPost(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

// Controller to get comments by post ID
const getCommentByPostId = catchAsync(async (req, res) => {
  const result = await CommentServices.getCommentByPostId(req.params.postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments fetched successfully',
    data: result,
  });
});

// Controller to edit a comment
const editComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;

  const result = await CommentServices.editComment(commentId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: result,
  });
});

// Controller to delete a comment
const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;

  const result = await CommentServices.deleteComment(commentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getCommentByPostId,
  editComment,
  deleteComment,
};
