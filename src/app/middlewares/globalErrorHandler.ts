/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  if (err instanceof ZodError) {
    const simlifiedError = handleZodError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSource = simlifiedError?.errorSource;
  } else if (err?.name === 'ValidationError') {
    const simlifiedError = handleValidationError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSource = simlifiedError?.errorSource;
  } else if (err?.name === 'CastError') {
    const simlifiedError = handleCastError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSource = simlifiedError?.errorSource;
  } else if (err?.code === 11000) {
    const simlifiedError = handleDuplicateError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSource = simlifiedError?.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
