/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

import { Types } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: keyof typeof USER_ROLE;
  status: keyof typeof USER_STATUS;
  profilePhoto?: string;
  isVerified: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}

export interface IUserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
