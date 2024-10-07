import express from 'express';
import { PostControllers } from './post.controller';

const router = express.Router();

router.post('/', PostControllers.createPost);
router.get('/', PostControllers.getAllPost);
router.get('/:id', PostControllers.getSinglePost);
router.put('/:id', PostControllers.updatePost);
router.delete('/:id', PostControllers.deletePost);
router.get('/my-post/:email', PostControllers.getMyPost);

router.post('/:postId/upvote', PostControllers.upvotePost);
router.post('/:postId/downvote', PostControllers.downvotePost);

export const PostRoutes = router;
