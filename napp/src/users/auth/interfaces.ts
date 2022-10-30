export interface ILoginReq {
  email: string;
  password: string;
}
export interface ILoginRes {
  user: any; // todo
  auth: { token: string };
}

export interface ISignUpReq {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
}
export type ISignUpRes = ILoginRes;

export interface IJwtPayload {
  sub: number;
  iat: number;
}
