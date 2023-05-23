export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
  user: IUser
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface IBooks {
  Title: string;
  author: string;
  image: string;
  rating: number;
  published: string;
  description: string;
  id: string;
}

export interface IBooksResponse {
  status: string,
  data: IBooks[]
}