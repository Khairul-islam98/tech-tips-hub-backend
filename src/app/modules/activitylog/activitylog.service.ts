import { IUser } from '../user/user.interface';
import { ActivityLog } from './activitylog.model';

const logActivity = async (user: IUser, action: string) => {
  try {
    const newLog = new ActivityLog({
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      action,
    });
    await newLog.save();
  } catch (error) {
    console.error('Error logging activity:', error);
    throw new Error('Error logging activity');
  }
};

const getAllActivityLogsFromDB = async () => {
  const result = await ActivityLog.find().populate('userId');
  return result;
};

export const activityLogService = {
  logActivity,
  getAllActivityLogsFromDB,
};
