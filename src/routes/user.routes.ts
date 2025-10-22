import { Router } from 'express';
import * as User from '../controllers/user.controller';
import { authGuard, requireAdminOrSelfForParam, requireSuperAdmin } from '../middleware/auth';

export const userRouter = Router();

// ---------------- AUTH ----------------
userRouter.post('/register', authGuard, requireSuperAdmin, User.register);      // create new user
userRouter.post('/login', User.login);                      // login by email or phone
userRouter.post('/refresh', User.refresh);                  // refresh tokens
userRouter.post('/logout', authGuard, User.logout);         // logout user

// ---------------- PROFILE ----------------
userRouter.patch('/me', authGuard, User.updateUser);        // update own profile

// ---------------- ADMIN / USER MANAGEMENT ----------------
userRouter.patch('/:userId/activate', authGuard, requireSuperAdmin, User.activateUser);
userRouter.patch('/:userId/deactivate', authGuard, requireSuperAdmin, User.deactivateUser);
userRouter.delete('/:userId', authGuard, requireSuperAdmin, User.deleteUser);
userRouter.patch('/:userId/password',authGuard, requireSuperAdmin, User.updatePassword);  // update own password


// ---------------- GET CURRENT USER (optional) ----------------
userRouter.get('/me', authGuard, async (req, res) => {
  res.json(req.user);
});

// ---------------- GET CURRENT USER (optional) ----------------
userRouter.get('/me', requireSuperAdmin, async (req, res) => {
  res.json(req.user);
});

// ---------------- GET ALL USERS ----------------
userRouter.get('/', authGuard, requireSuperAdmin, User.getAllUsers);

