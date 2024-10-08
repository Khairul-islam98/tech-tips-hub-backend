import express from 'express';
import { AnalyticsController } from './analytics.controller';

const router = express.Router();

router.get('/daily/:userId', AnalyticsController.dailyPostAnylatics);
router.get('/weekly/:userId', AnalyticsController.weeklyPostAnylatics);
router.get('/monthly/:userId', AnalyticsController.monthlyPostAnylatics);

router.get('/', AnalyticsController.adminAnalytics);
router.get('/posts', AnalyticsController.getAllPostAnalytics);
router.get('/payment', AnalyticsController.getAllPaymentAnalytics);

export const AnalyticsRoutes = router;
