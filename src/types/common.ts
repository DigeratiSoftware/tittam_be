export type Id = string;
export type Nullable<T> = T | null;



export interface JwtPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
