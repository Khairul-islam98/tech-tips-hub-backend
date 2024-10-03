import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// Get user profile
const getMyProfile = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getMyProfileFromDB(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

// Update user profile
const updateMyProfile = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.updateMyProfileIntoDB(email, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

// Follow a user
const followUser = catchAsync(async (req, res) => {
  const { userId, targetId } = req.body;
  const result = await UserServices.followUser(userId, targetId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User followed successfully',
    data: result,
  });
});

// Unfollow a user
const unfollowUser = catchAsync(async (req, res) => {
  const { userId, targetId } = req.body;
  const result = await UserServices.unfollowUser(userId, targetId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unfollowed successfully',
    data: result,
  });
});

export const UserControllers = {
  updateMyProfile,
  getMyProfile,
  followUser,
  unfollowUser,
};
