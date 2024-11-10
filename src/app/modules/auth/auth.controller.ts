import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const socialLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.socialLogin(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userEmail = req.body.email;
  const result = await AuthServices.forgetPassword(userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.resetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesful!',
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  forgetPassword,
  resetPassword,
  socialLogin,
};
