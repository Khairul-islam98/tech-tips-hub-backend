import { Notification } from './notification.model';

const getNotificationsForUser = async (userId: string) => {
  const result = await Notification.find({ userId })
    .populate('postId')
    .sort({ createdAt: -1 });
  return result;
};

const deleteUserNotifications = async (
  userId: string,
  notificationId: string,
) => {
  const result = await Notification.findOneAndDelete({
    _id: notificationId,
    userId: userId,
  });
  return result;
};

export const NotificationService = {
  getNotificationsForUser,
  deleteUserNotifications,
};
