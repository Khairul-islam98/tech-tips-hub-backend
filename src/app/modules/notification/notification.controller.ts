import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { NotificationService } from './notification.service';
import catchAsync from '../../utils/catchAsync';

const getUserNotifications = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const notifications =
    await NotificationService.getNotificationsForUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications retrieved successfully',
    data: notifications,
  });
});

const deleteUserNotification = catchAsync(async (req, res) => {
  const { userId, notificationId } = req.params;
  const result = await NotificationService.deleteUserNotifications(
    userId,
    notificationId,
  );

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Notification deleted successfully',
    data: result,
  });
});

export const NotificationController = {
  getUserNotifications,
  deleteUserNotification,
};
