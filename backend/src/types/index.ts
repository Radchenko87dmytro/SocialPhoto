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
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CommentType {
  _id: string;
  id: string;
  commentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ReactionType {
  _id: string;
  id: string;
  postId: string;
  commentId: string;
  userId: string;
  reactionType: number;
  parentType: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  //__v?: number;
}

export interface ErrorType {
  status: number;
  message: string;
}
