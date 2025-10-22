import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { JwtPayload, TokenPair } from '../types/common';

const SALT_ROUNDS = 10;

export interface HashStrategy {
  hash(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}

class BcryptStrategy implements HashStrategy {
  async hash(plain: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(plain, salt);
  }
  async compare(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}

export const hashStrategy: HashStrategy = new BcryptStrategy();

export const jwtAdapter = {
  generateTokens(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenPair {
    const accessSecret = process.env.JWT_ACCESS_SECRET!;
    const refreshSecret = process.env.JWT_REFRESH_SECRET!;
    const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '1d';
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '180d';

    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: accessExpiresIn });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiresIn });

    return { accessToken, refreshToken };
  },

  verifyAccess(token: string): JwtPayload {
    const secret = process.env.JWT_ACCESS_SECRET!;
    return jwt.verify(token, secret) as JwtPayload;
  },

  verifyRefresh(token: string): JwtPayload {
    const secret = process.env.JWT_REFRESH_SECRET!;
    return jwt.verify(token, secret) as JwtPayload;
  },
};
