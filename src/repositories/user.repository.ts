import { User, type IUser } from '../models/user.model';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const userRepository = {
  // ---------------- CREATE ----------------
  async create(data: Partial<IUser>) {
    return User.create(data);
  },

  // ---------------- FIND ----------------
  async findById(id: string) {
    return User.findById(id);
  },

  async findOne(filter: FilterQuery<IUser>) {
    return User.findOne(filter);
  },

  // ---------------- UPDATE ----------------
  async updateById(id: string, update: UpdateQuery<IUser>) {
    return User.findByIdAndUpdate(
      id,
      { ...update, updatedAt: new Date() }, // auto set updatedAt
      { new: true }
    );
  },

  // ---------------- DELETE ----------------
  async deleteById(id: string) {
    console.log(id,"suser")
    return User.findByIdAndDelete(id);
  },

  // ---------------- STATUS ----------------
  async setStatus(id: string, status: string, updatedBy?: string) {
    return User.findByIdAndUpdate(
      id,
      {
        status,
        updatedBy: updatedBy || 'system',
        updatedAt: new Date(),
      },
      { new: true }
    );
  },

  // ---------------- LOGIN META ----------------
  async updateLoginMeta(id: string, loginStatus: boolean) {
    return User.findByIdAndUpdate(
      id,
      {
        loginStatus,
        currentLoginTime: loginStatus ? new Date() : undefined,
        lastLoginTime: !loginStatus ? new Date() : undefined,
      },
      { new: true }
    );
  },

// ---------------- FIND MANY ----------------
async findMany(filter: any = {}) {
  return User.find(filter);
}

};


