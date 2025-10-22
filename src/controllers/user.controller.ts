import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import { userService } from "../services/user.service";
import { User, LoginHistory } from "../models/user.model";

// ------------------ REGISTER ------------------
export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role, phone, isActive } = req.body;
    const createdBy = req.userEmail || "system";

    const result = await userService.register(name, email, password, role, phone, isActive, createdBy);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// ------------------ UPDATE PASSWORd ------------------

export const updatePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {userId} = req.params;
    const {newPassword } = req.body;
    const updatedBy = req.userEmail || "system";

    const result = await userService.updatePassword(userId, newPassword, updatedBy);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


// ------------------ LOGIN ------------------
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const result = await userService.login(username, password);

    const user = await userService.findUser(username);


    const now = new Date();
    user.lastLoginAt = user.currentLoginAt;
    user.currentLoginAt = now;
    user.loginStatus = true;
    await user.save();

    await LoginHistory.findOneAndUpdate(
      { user: user._id },
      { $push: { logins: { loginTime: now } } },
      { upsert: true, new: true }
    );

    res.json({
      ...result,
      currentLoginAt: user.currentLoginAt,
      lastLoginAt: user.lastLoginAt,
    });
  } catch (err) {
    next(err);
  }
};

// ------------------ REFRESH TOKEN ------------------
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    const result = await userService.refresh(refreshToken);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// ------------------ UPDATE USER ------------------
export const updateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedBy = req.userEmail || "system";

    const result = await userService.updateUser(id, updates);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


// ------------------ ACTIVATE USER ------------------
export const activateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const updatedBy = req.userEmail || "system";

    const result = await userService.updateUser(userId, { isActive: true, updatedBy });
    res.json({ message: "User activated", result });
  } catch (err) {
    next(err);
  }
};

// ------------------ DEACTIVATE USER ------------------
export const deactivateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const updatedBy = req.userEmail || "system";

    const result = await userService.updateUser(userId, { isActive: false, updatedBy });
    res.json({ message: "User deactivated", result });
  } catch (err) {
    next(err);
  }
};

// ------------------ DELETE USER ------------------
export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ------------------ LOGOUT ------------------
export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.loginStatus = false;
    await user.save();

    res.json({ message: "User logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // only super_admin can access
    if (!req.user || req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};



