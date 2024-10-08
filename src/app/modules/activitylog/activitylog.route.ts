import express from 'express';
import { activityLogController } from './activitylog.controller';

const router = express.Router();

router.get('/', activityLogController.getAllActivityLogs);

export const activityLogRoute = router;
