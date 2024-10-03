import express from 'express';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post('/', CommentControllers.createComment);
router.get('/:postId', CommentControllers.getCommentByPostId);
router.delete('/:commentId', CommentControllers.deleteComment);
router.put('/:commentId', CommentControllers.editComment);

export const CommentRoutes = router;
