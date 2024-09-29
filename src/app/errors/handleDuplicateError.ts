/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSource,
  };
};

export default handleDuplicateError;
