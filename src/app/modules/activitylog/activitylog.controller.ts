import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { activityLogService } from './activitylog.service';

const getAllActivityLogs = catchAsync(async (req, res) => {
  const result = await activityLogService.getAllActivityLogsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All activity logs fetched successfully!',
    data: result,
  });
});

export const activityLogController = {
  getAllActivityLogs,
};
