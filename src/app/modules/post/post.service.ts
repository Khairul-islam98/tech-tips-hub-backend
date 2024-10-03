import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../user/user.model';
import { postSeachableFields } from './post.constant';
import { IPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(
    Post.find().populate('comments').populate('authorId'),
    query,
  ).search(postSeachableFields);

  const result = await await postQuery.modelQuery;
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id)
    .populate('authorId')
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
      },
    });
  return result;
};
const getMyPostIntoDB = async (userData: string) => {
  const user = await User.findById(userData);
  if (!user) {
    throw new Error('User not found');
  }

  const result = await Post.find({ user: userData })
    .populate('comments')
    .populate('authorId');
  return result;
};
export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  getMyPostIntoDB,
};
