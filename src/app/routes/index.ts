import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PostRoutes } from '../modules/post/post.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
