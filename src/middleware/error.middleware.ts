import { Response, Request, NextFunction } from 'express';
import Error from '../interfaces/error.interface';

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const massage = error.massage || 'something wrong is happened';
  res.status(status).json({ status, massage });
  next();
};

export default errorMiddleware;
