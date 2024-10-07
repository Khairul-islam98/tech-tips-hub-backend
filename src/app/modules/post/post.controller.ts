import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

// create Post
const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Post Created Successfully',
    data: result,
  });
});

// get all post
const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully',
    data: result,
  });
});
// get single post
const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Post retrieved successfully',
    data: result,
  });
});

//post update
const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.updatePostIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post update successfully',
    data: result,
  });
});

// post delete
const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deletePostFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  });
});

// get my post
const getMyPost = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await PostServices.getMyPostIntoDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Post retrieved successfully',
    data: result,
  });
});

// create upvote
const upvotePost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const result = await PostServices.upvotePostDB(req.params.postId, userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'upvoted successfully',
    data: result,
  });
});

// create downvote
const downvotePost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const result = await PostServices.downvotePostDB(req.params.postId, userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'upvoted successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  getMyPost,
  upvotePost,
  downvotePost,
};
