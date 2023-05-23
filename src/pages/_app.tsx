import { type AppType } from "next/app";

import " /styles/globals.css";
import "@smastrom/react-rating/style.css";
import WrapperLayout from " /components/Layout/Wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { deleteCookie, getCookies } from "cookies-next";
import jwt_decode from "jwt-decode";
import useStore from " /store";
import { IUser } from " /types/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  const token = getCookies();
  const router = useRouter();
  const store = useStore();
  const hashToken = () => {
    if (token["book-token"] !== undefined) {
      return true;
    }
    return false;
  };

  const setLogout = () => {
    store.setAuthUser(null);
    deleteCookie("book-token");
    router.push("/login").catch(() => console.log("router err..."))
  };

  const isExpired = () => {
    interface Token {
      exp: number;
    }
    const decodeToken: Token = jwt_decode(String(token["book-token"]));
    const isExpired = Date.now() >= decodeToken.exp * 1000;

    return isExpired;
  };

  const setLogin = () => {
    const decodeToken: IUser = jwt_decode(String(token["book-token"]));
    store.setToken(String(token["book-token"]));
    store.setAuthUser({
      email: decodeToken.email,
      firstName: decodeToken.firstName,
      gender: decodeToken.gender,
      id: decodeToken.id,
      image: decodeToken.image,
      lastName: decodeToken.lastName,
      username: decodeToken.username,
    });
  };

  useEffect(() => {
    router.pathname != "/login"
      ? hashToken()
        ? !isExpired()
          ? setLogin()
          : setLogout()
        : setLogout()
      : null;
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer closeOnClick pauseOnFocusLoss draggable />
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
    </QueryClientProvider>
  );
};

export default MyApp;
