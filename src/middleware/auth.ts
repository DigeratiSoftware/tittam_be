import { Request, Response, NextFunction } from 'express';
import { jwtAdapter } from '../utils/security';
import { HttpError } from '../utils/http-error';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;        // user id
        email: string;      // user email
        role: 'user' | 'admin' | 'super_admin';
      };
      userEmail?: string;   // shortcut for createdBy / updatedBy
    }
  }
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;        // user id
    email: string;
    role: "user" | "admin" | "super_admin";
  };
  userEmail?: string;
}

/**
 * Middleware: Validates access token and attaches user info to req
 */
export const authGuard = (req: Request, _res: Response, next: NextFunction) => {

  console.log(req.params);
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Missing token'));
  }

  try {
    const token = header.split(' ')[1];
    const payload = jwtAdapter.verifyAccess(token); // must return { sub, email, role }

    req.user = {
      userId: payload.userId, // use 'userId' from JWT payload
      email: payload.email,
      role: payload.role,
    };

    req.userEmail = payload.email; // 🔑 shortcut for createdBy / updatedBy

    next();
  } catch (e) {
    return next(new HttpError(401, 'Invalid or expired access token'));
  }
};

/**
 * Middleware: Only admins or the user themselves can access
 */
export const requireAdminOrSelfForParam = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) return next(new HttpError(401, 'Unauthorized'));
  if (user.role === 'admin') return next();
  if (user.userId === req.params.id) return next();
  return next(new HttpError(403, 'Forbidden'));
};


export const requireSuperAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) return next(new HttpError(401, 'Unauthorized'));
  if (user.role === 'super_admin') return next();
  return next(new HttpError(403, 'Forbidden'));
};
