import { IUser } from './user.interface';
import { User } from './user.model';
import { Types } from 'mongoose';

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
const getMyProfileFromDB = async (email: string) => {
  const result = await User.findOne({ email })
    .populate('followers')
    .populate('following');
  return result;
};

const updateMyProfileIntoDB = async (
  email: string,
  payload: Partial<IUser>,
) => {
  const result = await User.findOneAndUpdate({ email }, payload, { new: true });

  return result;
};

const followUser = async (userId: string, targetId: string) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { following: new Types.ObjectId(targetId) } },
    { new: true },
  );

  const targetUser = await User.findOneAndUpdate(
    { _id: targetId },
    { $addToSet: { followers: new Types.ObjectId(userId) } },
    { new: true },
  );

  return { user, targetUser };
};

const unfollowUser = async (userId: string, targetId: string) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { following: new Types.ObjectId(targetId) } },
    { new: true },
  );

  const targetUser = await User.findOneAndUpdate(
    { _id: targetId },
    { $pull: { followers: new Types.ObjectId(userId) } },
    { new: true },
  );

  return { user, targetUser };
};

export const UserServices = {
  getAllUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  updateMyProfileIntoDB,
  getMyProfileFromDB,
  followUser,
  unfollowUser,
};
