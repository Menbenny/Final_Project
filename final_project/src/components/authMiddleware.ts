// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel'; // Assuming you have a User model

interface JwtPayload {
  id: string;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        // Attach user to request
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
          res.status(401);
          throw new Error('User not found.');
        }

        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed.');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token.');
    }
  }
);
