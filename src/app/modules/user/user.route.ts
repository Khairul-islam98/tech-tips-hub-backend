import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();
router.get('/', UserControllers.getAllUser);
router.put('/:id', UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);
router.get('/profile/:email', UserControllers.getMyProfile);
router.put('/profile/:email', UserControllers.updateMyProfile);

router.post('/follow', UserControllers.followUser);
router.post('/unfollow', UserControllers.unfollowUser);

export const UserRoutes = router;
