import { LogoMyBook } from " /assets/images";
import { LoginInput, loginSchema } from " /schema/login.schema";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import Spinner from " /components/Spinner";
import { loginUserFn } from " /api/LoginAPI";
import { useMutation } from "@tanstack/react-query";
import useStore from " /store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import axios, { AxiosError, AxiosResponse } from "axios";

const Login: NextPage = () => {
  const router = useRouter();
  const store = useStore();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [isShow, setIsShow] = useState(false);

  const { mutate: loginUser } = useMutation(
    async (userData: LoginInput) => await loginUserFn(userData),
    {
      onMutate(variables) {
        store.setRequestLoading(true);
      },
      onSuccess: async (data) => {
        store.setRequestLoading(false);
        store.setToken(data.access_token);
        store.setAuthUser(data.user);
        toast.success("You successfully logged in");
        setCookie("book-token", data.access_token, {
          maxAge: 60 * 60 * 1,
        });
        reset();
        await router.push("/");
      },
      onError: (error: Error | AxiosError) => {
        store.setRequestLoading(false);
        interface messageData {
          message: string
        }
        if (axios.isAxiosError<messageData>(error)) {
          toast.error(error.response?.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  const onSubmitHandler = (values: LoginInput) => {
    loginUser(values);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Submission final Neumedira" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative md:mt-[34px] h-max w-full">
        <div className="shadow-login p m-auto md:mb-[33px] flex h-full min-h-screen md:min-h-[917px] w-full max-w-[565px] flex-col items-center pb-[50px] md:pb-[0px] md:rounded-[10px] bg-white px-[20px] md:px-[70px] pt-[63px]">
          <div className="h-auto w-auto">
            <Image
              style={{
                height: 92,
                width: 150,
              }}
              priority
              src={LogoMyBook}
              alt="_logo"
            />
          </div>
          <div className="mt-[60px] text-center">
            <h1 className="text-[20px] text-primary">Welcome Back!</h1>
            <p className="mt-[10px] text-[15px] text-second">
              Sign in to continue to yourDigital Library
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="mt-[42px] w-full text-primary"
          >
            <div className="flex w-full flex-col items-center gap-[24px]">
              <div className="w-full">
                <label className="font-bold">Username</label>
                <div className="mt-[2px] w-full">
                  <input
                    placeholder="Username"
                    {...register("username")}
                    className={twMerge(
                      `form-input w-full`,
                      `${
                        errors.username?.message != undefined
                          ? "input-error"
                          : ""
                      }`
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="font-bold">Password</label>
                <div className="relative mt-[2px] w-full">
                  <input
                    placeholder="Password"
                    {...register("password")}
                    type={isShow ? "text" : "password"}
                    className={twMerge(
                      `form-input w-full`,
                      `${
                        errors.password?.message != undefined
                          ? "input-error"
                          : ""
                      }`
                    )}
                  />
                  <div
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                    className="absolute bottom-[17px] right-[16px] text-second transition-all hover:scale-110"
                  >
                    {isShow && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                    {!isShow && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[50px] flex flex-row justify-between">
              <div>
                <label className="checkbox">
                  <input type="checkbox" />
                  Remember me
                  <span className="checkmark"></span>
                </label>
              </div>
              <div>
                <p className="cursor-pointer underline">Forgot password?</p>
              </div>
            </div>
            <button
              type="submit"
              disabled={store.requestLoading}
              className="btn btn-primary mt-[40px] h-[48px] w-full rounded-[8px]"
            >
              {store.requestLoading ? (
                <div className="flex items-center gap-3">
                  <Spinner />
                  <span className="inline-block text-white">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="mt-[60px] flex w-full flex-row justify-between text-primary">
            <div>
              New User?{" "}
              <span className="cursor-pointer underline">Register Here</span>
            </div>
            <p className="cursor-pointer">Use as Guest </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
