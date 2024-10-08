import express from 'express';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get('/:userId', NotificationController.getUserNotifications);
router.delete(
  '/:userId/:notificationId',
  NotificationController.deleteUserNotification,
);

export const NotificationRoutes = router;
