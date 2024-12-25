import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError.utils";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Internal Server Error";

  // (use a logger in production)
  console.error(err);

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
