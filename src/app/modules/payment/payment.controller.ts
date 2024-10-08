/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { paymentService, paymentServices } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

export const paymentController = {
  async initiatePayment(req: Request, res: Response) {
    const { userId, email, amount } = req.body;

    try {
      const paymentUrl = await paymentService.initializePayment(
        userId,
        email,
        amount,
      );
      res.json({ success: true, paymentUrl });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
};

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;

  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
  );
  res.send(result);
};

const getAllPayments = catchAsync(async (req, res) => {
  const result = await paymentServices.getAllPaymentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payments fetched successfully',
    data: result,
  });
});

const getMyPayment = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await paymentServices.getMyPaymentsFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payments fetched successfully',
    data: result,
  });
});

export const paymentControler = {
  confirmationController,
  getAllPayments,
  getMyPayment,
};
