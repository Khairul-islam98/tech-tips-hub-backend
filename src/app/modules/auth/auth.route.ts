import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forget-password', AuthController.forgetPassword);
router.post('/reset-password', AuthController.resetPassword);

export const AuthRoutes = router;
