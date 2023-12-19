import { NextFunction, Request, Response } from "express";
import { IUser } from "../models";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const authHeaderString = Array.isArray(authHeader)
    ? authHeader[0]
    : authHeader;

  if (!authHeaderString?.startsWith("Bearer ")) {
    return next(createHttpError(401, "No access token"));
  }

  const token = authHeaderString.split(" ")[1];

  if (!token) return next(createHttpError(401, "No access token"));

  const decoded = jwt.verify(
    token,
    process.env.SECRET_ACCESS_KEY as string
  ) as JwtPayload;

  if (!decoded) {
    return next(createHttpError(403, "Access token is invalid"));
  }

  req.user = decoded.id;

  next();
};
