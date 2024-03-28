export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  profileUrl?: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorType {
  status: number;
  message: string;
}
