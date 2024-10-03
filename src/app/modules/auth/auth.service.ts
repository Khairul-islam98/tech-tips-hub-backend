import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { IUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../utils/sendEmail';

const registerUser = async (payload: IUser) => {
  const user = await User.isUserExist(payload.email);
  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'This user is already exist!');
  }
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExist(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  if (
    !payload.password ||
    !(await User.isPasswordMatched(payload.password, user.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect!');
  }
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    profilePhoto: user.profilePhoto,
    isVerified: user.isVerified,
    followers: user.followers,
    following: user.following,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_secret_expires_in as string,
  });
  return {
    user,
    accessToken,
  };
};
const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, `${user.name} you are block`);
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    isVerified: user.isVerified,
    followers: user.followers,
    following: user.following,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30m',
  });

  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
};
const resetPassword = async (payload: {
  email: string;
  newPassword: string;
  token: string;
}) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, `${user.name} you are block`);
  }

  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );
  await User.findOneAndUpdate(
    { email: decoded.email, role: decoded.role },
    {
      password: newHashedPassword,
    },
  );
};

export const AuthServices = {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
};
