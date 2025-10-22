import { userRepository } from '../repositories/user.repository';
import { HttpError } from '../utils/http-error';
import { hashStrategy, jwtAdapter } from '../utils/security';

export const userService = {
  // ---------------- REGISTER ----------------
  async register(
  name: string,
  email: string,
  password: string,
  role: 'user' | 'admin' | 'super_admin',
  phone?: string,
  isActive?: boolean,
  createdBy?: string
) {
 const existing = await userRepository.findOne({
  $or: [{ email }, { phone }],
});

if (existing) {
  if (existing.email === email) {
    throw new HttpError(409, "Email already in use");
  }
  if (phone && existing.phone === phone) {
    throw new HttpError(409, "Phone number already in use");
  }
}

  const hashed = await hashStrategy.hash(password);
  await userRepository.create({
    name,
    email,
    password: hashed,
    phone,
    role,
    isActive: isActive ?? true,
    createdBy: createdBy || "system",
  });

  return { success: true, message: "User registered successfully" };
},

  // ---------------- LOGIN ----------------
  async login(username: string, password: string) {
  // Find user by email or phone number
  const user = await userRepository.findOne({
    $or: [{ email: username }, { phone: username }],
  });

  if (!user) throw new HttpError(401, 'Invalid credentials');

  const ok = await user.comparePassword(password);
  if (!ok) throw new HttpError(401, 'Invalid credentials');

  if (user.isActive !== true)
    throw new HttpError(403, 'User is not active');

  const tokens = jwtAdapter.generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return { success: true, user: sanitize(user), ...tokens };
},

// ---------------- FIND USER ----------------
  async findUser(username: string) {
    // identifier can be email or phone number
    const user = await userRepository.findOne({
      $or: [{ email: username }, { phone: username }],
    });
    if (!user) throw new HttpError(404, 'User not found');
    return user;
  },

  // ---------------- GET ALL USERS ----------------
async getAllUsers() {
  const users = await userRepository.findMany({});
  return users.map(u => sanitize(u));
},


  // ---------------- REFRESH ----------------
  async refresh(refreshToken: string) {
    const payload = jwtAdapter.verifyRefresh(refreshToken);
    const user = await userRepository.findById(payload.userId);
    if (!user) throw new HttpError(404, 'User not found');

    const tokens = jwtAdapter.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: sanitize(user), ...tokens };
  },

  // ---------------- UPDATE USER ----------------
  async updateUser(userId: string, data: any) {
    data.updatedBy = data.updatedBy || 'system';
    const updated = await userRepository.updateById(userId, data);
    if (!updated) throw new HttpError(404, 'User not found');
    return sanitize(updated);
  },

  // ---------------- UPDATE PASSWORD ----------------
 async updatePassword(userId: string, newPassword: string, updatedBy: string) {
  
    const hashed = await hashStrategy.hash(newPassword);

    await userRepository.updateById(userId, {
      password: hashed,
      updatedBy,
      updatedAt: new Date(),
    });

    return { success: true, message: "Password updated successfully" };
  },

  // ---------------- SET STATUS ----------------
  async setStatus(userId: string, status: boolean, updatedBy?: string) {
    const updated = await userRepository.updateById(userId, {
      isActive: status,
      updatedBy: updatedBy || 'system',
    });
    if (!updated) throw new HttpError(404, 'User not found');
    return sanitize(updated);
  },

  // ---------------- DELETE USER ----------------
  async deleteUser(userId: string) {
    const deleted = await userRepository.deleteById(userId);
    if (!deleted) throw new HttpError(404, 'User not found');
    return { message: 'User deleted' };
  },
};

// ---------------- HELPER ----------------
function sanitize(u: any) {
  if (u.toObject) {
    const { password, __v, ...rest } = u.toObject();
    return rest;
  }
  const { password, __v, ...rest } = u;
  return rest;
}
