import type { Response } from 'express';

export const success = (res: Response, data?: any) => {
  return res.json({
    code: 0,
    msg: 'ok',
    data: data,
  });
};

export const error = (res: Response, error: (Error & { status?: number }) | string, status?: number) => {
  const resStatus = status || (typeof error === 'string' ? false : error.status) || 200;
  return res.status(resStatus).json({
    code: -1,
    status: 'fail',
    msg: error,
  });
};

export const notFound = (res: Response, error?: string) => {
  return res.status(404).json({
    code: 404,
    status: 'fail',
    msg: error || 'Not Found',
  });
};
