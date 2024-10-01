/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

import { IPayment } from './payment.interface';
import config from '../../config';

import { readFileSync } from 'fs';
import { join } from 'path';
import { Payment } from './payment.model';
import { User } from '../user/user.model';
import { Types } from 'mongoose';

export const paymentService = {
  async initializePayment(
    userId: string,
    email: string,
    amount: number,
  ): Promise<string> {
    const transactionId = `TXN-${Date.now()}`;

    const payload = {
      store_id: config.store_id,
      signature_key: config.signature_key,
      cus_email: email,
      cus_phone: '0123456789',
      amount: amount,
      cus_name: 'John Doe',
      tran_id: transactionId,
      currency: 'USD',
      success_url: `https://car-rental-reservation-system-one.vercel.app/api/payment/confirmation?transactionId=${transactionId}&status=success`,
      fail_url: 'http://www.merchantdomain.com/failedpage.html',
      cancel_url: 'http://www.merchantdomain.com/cancelpage.html',
      desc: userId,
      type: 'json',
    };

    try {
      const response = await axios.post(config.payment_url as string, payload);

      if (response.data.result === 'true') {
        const { payment_url } = response.data;

        await Payment.create<IPayment>({
          email,
          amount,
          transactionId,
          date: new Date().toISOString(),
          userId: new Types.ObjectId(userId),
          status: 'pending',
        });

        return payment_url;
      } else {
        throw new Error('Failed to get payment URL');
      }
    } catch (error) {
      console.error('Payment initialization failed:', error);
      throw new Error('Payment initialization failed');
    }
  },
};

const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    console.error('Payment validation failed:', err);
    throw new Error('Payment validation failed!');
  }
};

const confirmationService = async (transactionId: string, status: string) => {
  // Step 1: Verify the payment
  const verifyResponse = await verifyPayment(transactionId);

  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    // Step 2: Update the payment status
    const paymentUpdateResult = await Payment.findOneAndUpdate(
      { transactionId },
      { status: 'paid' },
    );

    if (!paymentUpdateResult) {
      throw new Error('Failed to update payment status');
    }

    const userId = paymentUpdateResult.userId;

    const userUpdateResult = await User.findOneAndUpdate(
      { _id: userId },
      { isVerified: true },
    );

    if (!userUpdateResult) {
      throw new Error('Failed to update booking status');
    }

    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  // Step 4: Read and modify the confirmation template
  const filePath = join(__dirname, '../../../../public/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
