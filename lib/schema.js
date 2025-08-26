import { z } from "zod";

export const schema = z.object({
    name: z.string().min(2, "Name is required"),
  email: z.email(),
  password: z.string().min(6), // Enforce strong password
});
