/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { paymentService, paymentServices } from './payment.service';

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

export const paymentControler = {
  confirmationController,
};
