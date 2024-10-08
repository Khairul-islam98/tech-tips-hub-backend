import { Router } from 'express';
import { paymentControler, paymentController } from './payment.controller';

const router = Router();

router.post('/initiate-payment', paymentController.initiatePayment);

router.post('/confirmation', paymentControler.confirmationController);

router.get('/', paymentControler.getAllPayments);
router.get('/:email', paymentControler.getMyPayment);

export const PaymentRoutes = router;
