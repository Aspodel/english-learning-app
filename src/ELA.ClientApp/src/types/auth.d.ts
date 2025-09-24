declare interface AuthCredentials {
  username: string;
  password: string;
}

declare interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

declare interface SignUpCredentials {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

declare interface SignUpResponse {
  userId: string;
}
