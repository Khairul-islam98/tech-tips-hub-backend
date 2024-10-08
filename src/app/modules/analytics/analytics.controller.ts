/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnalyticsServices } from './analytics.service';
import { generateFullYearData } from './analytics.constant';
import { Post } from '../post/post.model';
import { Payment } from '../payment/payment.model';

const dailyPostAnylatics = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AnalyticsServices.dailyPostAnylaticsFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Data fetched successfully',
    success: true,
    data: result,
  });
});
const weeklyPostAnylatics = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AnalyticsServices.weeklyPostAnalyticsFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Data fetched successfully',
    success: true,
    data: result,
  });
});
const monthlyPostAnylatics = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AnalyticsServices.monthlyPostAnalyticsFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Data fetched successfully',
    success: true,
    data: result,
  });
});

const getAllPostAnalytics = catchAsync(async (req, res) => {
  const result = await generateFullYearData(Post);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Data fetched successfully',
    success: true,
    data: result,
  });
});

const adminAnalytics = catchAsync(async (req, res) => {
  const result = await AnalyticsServices.adminAnalyticsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'total  count successfully',
    data: result,
  });
});

const getAllPaymentAnalytics = catchAsync(async (req, res) => {
  const result = await generateFullYearData(Payment as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetched successfully',
    data: result,
  });
});

export const AnalyticsController = {
  dailyPostAnylatics,
  weeklyPostAnylatics,
  monthlyPostAnylatics,
  adminAnalytics,
  getAllPostAnalytics,
  getAllPaymentAnalytics,
};
