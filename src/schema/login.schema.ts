import { TypeOf, object, string } from "zod";

export const loginSchema = object({
  username: string()
    .min(1, "Username address is required"),
  password: string()
    .min(1, "Password is required")
});

export type LoginInput = TypeOf<typeof loginSchema>;
