import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }

    // Extract the token from the header
    const token = authHeader.slice(7);

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add the user object to the request object
      req['user'] = decoded;
      const url = req.originalUrl;
      const match = url.match(/\/usuarios\/(\d+)/);
      if (match) {
        const id = parseInt(match[1]);
        if (req.user['sub'] != id) {
          return res
            .status(401)
            .json({ message: 'Você não pode acessar os dados deste usuário' });
        }
      }

      // Call the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
