export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp extends ISignIn {
    userName: string;
    role?:string
}

export interface ISignInResponse {
  status: number;
  success: boolean;
  user: {
    userName: string;
    email: string;
    password: string;
    role?: string;
    createdAt: string;
    updateAt: string;
  };
  token: string;
  message: string;
}
