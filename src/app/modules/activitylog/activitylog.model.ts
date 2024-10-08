import { model, Schema } from 'mongoose';
import { IActivityLog } from './activitylog.interface';

const activityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    action: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const ActivityLog = model<IActivityLog>(
  'ActivityLog',
  activityLogSchema,
);
