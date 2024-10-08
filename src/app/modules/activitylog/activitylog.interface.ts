import { Document, Types } from 'mongoose';

export interface IActivityLog extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  action: string;
}
