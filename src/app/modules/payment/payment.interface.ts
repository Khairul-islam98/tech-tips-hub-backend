import { Types } from 'mongoose';

export interface IPayment {
  email: string;
  userId: Types.ObjectId;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  transactionId: string;
  date: string;
}
