import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../utils/verifyToken';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    const { email, role } = decoded;

    const user = await User.isUserExist(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const status = user?.status;

    if (status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
