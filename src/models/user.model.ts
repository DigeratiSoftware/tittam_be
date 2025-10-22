import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// =====================
// Counter Model for Auto Increment
// =====================
interface ICounter extends Document {
  _id: string;
  seq: number;
}

const counterSchema = new Schema<ICounter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.model<ICounter>("Counter", counterSchema);

// =====================
// User Interface & Schema
// =====================
export interface IUser extends Document {
  userId: string; // custom id like USR001
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'user' | 'admin' | 'super_admin';
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  loginStatus: boolean;
  currentLoginAt?: Date;
  lastLoginAt?: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    userId: { type: String, unique: true }, // remove required, counter will assign
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin', 'super_admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String },
    updatedBy: { type: String },
    loginStatus: { type: Boolean, default: false },
    currentLoginAt: { type: Date },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

// ---------------- Password Compare Method ----------------
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// -------- Auto Increment for userId using Counter Collection --------
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await Counter.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.userId = `USR${String(counterDoc.seq).padStart(3, "0")}`;
      next();
    } catch (err) {
      next(err as Error);
    }
  } else {
    next();
  }
});

export const User = mongoose.model<IUser>("User", userSchema);

// =====================
// LoginHistory Interface & Schema
// =====================
export interface ILoginHistory extends Document {
  user: IUser["_id"];
  userId: string; // store USR001, USR002 etc.
  logins: { loginAt: Date }[];
}

const loginHistorySchema = new Schema<ILoginHistory>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: String, required: true },
    logins: [
      {
        loginAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const LoginHistory = mongoose.model<ILoginHistory>(
  "LoginHistory",
  loginHistorySchema
);
