import { LoginInput } from " /schema/login.schema";
import { ILoginResponse } from " /types/types";
import axios, { HeadersDefaults } from "axios";

const BASE_URL = "/backend_auth/";

const authApi = axios.create();

authApi.defaults.baseURL = BASE_URL;

authApi.defaults.headers.common["Content-Type"] = "application/json";

interface LoginResponse {
  token: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  image: string;
  lastName: string;
  username: string;
}

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<LoginResponse>("auth/login", user);
  return <ILoginResponse>{
    access_token: response.data.token,
    status: "Sukses",
    user: {
      email: response.data.email,
      firstName: response.data.firstName,
      gender: response.data.gender,
      id: response.data.id,
      image: response.data.image,
      lastName: response.data.lastName,
      username: response.data.username,
    },
  };
};
