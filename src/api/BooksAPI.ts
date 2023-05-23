import { LoginInput } from " /schema/login.schema";
import { IBooks, IBooksResponse, ILoginResponse } from " /types/types";
import axios, { HeadersDefaults } from "axios";

const BASE_URL = "/backend_books/";

const booksAPI = axios.create();

booksAPI.defaults.baseURL = BASE_URL;

booksAPI.defaults.headers.common["Content-Type"] = "application/json";

export const getAllBooksFn = async (jwt: string) => {
  const response = await booksAPI.get<IBooks[]>("books", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return <IBooksResponse>{
    status: "true",
    data: response.data,
  };
};


interface responseBookByID {
	status: string
	data: IBooks
}

export const getBooksByIDFn = async (id:string, jwt: string) => {
  const response = await booksAPI.get<IBooks>(`books/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return <responseBookByID>{
    status: "true",
    data: response.data,
  };
};