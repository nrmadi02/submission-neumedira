import { IUser } from " /types/types";
import { create } from "zustand";

type Store = {
  authUser: IUser | null;
  requestLoading: boolean;
  token: string,
  setToken: (string: string) => void,
  setAuthUser: (user: IUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  token: "null",
  setToken: (token) => set((state) => ({ ...state, token: token })),
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
}));

export default useStore;
