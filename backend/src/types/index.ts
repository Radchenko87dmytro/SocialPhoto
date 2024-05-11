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

export interface PostType {
  _id: string;
  id: string;
  linkUrl?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ErrorType {
  status: number;
  message: string;
}
