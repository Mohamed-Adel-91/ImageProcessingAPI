import express from 'express';

const logger = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  const url = req.url;
  console.log(`${url} was visited`);
  next();
};

export default logger;
