
export interface IAuthUser {
  _id?: string;
  userName: string;
  email: string;
  password?: string;
  role?: "user" | "admin";
  createdAt?: string;
  updateAt?: string;
}
export interface IAuthSignIn{
  email: string;
  password: string;
}
export interface IAuthState {
  user: IAuthUser | null;
  token: string | null;
}
export interface IAuthResponse {
  status: number;
  success: boolean;
  user: IAuthUser;
  token: string ;
  message: string;
}
