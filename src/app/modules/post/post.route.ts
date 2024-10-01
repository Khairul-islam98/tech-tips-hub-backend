import express from 'express';
import { PostControllers } from './post.controller';

const router = express.Router();

router.post('/', PostControllers.createPost);
router.get('/', PostControllers.getAllPost);
router.get('/:id', PostControllers.getSinglePost);
router.get('/my-post', PostControllers.getMyPost);

export const PostRoutes = router;
