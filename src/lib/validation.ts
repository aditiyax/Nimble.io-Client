// src/lib/validation.ts
import { z } from "zod";

export const emailSchema = z.string().min(5).max(254).email();
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[a-z]/, "Must include a lowercase letter")
  .regex(/[0-9]/, "Must include a number");

export const nameSchema = z
  .string()
  .min(2, "Name is too short")
  .max(80, "Name is too long")
  .regex(/^[\p{L} .'-]+$/u, "Only letters, spaces, and .'- are allowed");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const fileNameSchema = z
  .string()
  .min(1)
  .max(100)
  // allow typical file names without path traversal
  .regex(/^(?!\.)[A-Za-z0-9._-]+$/, "Invalid file name");

export const folderNameSchema = z
  .string()
  .min(1)
  .max(60)
  .regex(/^(?!\.)[A-Za-z0-9._-]+$/, "Invalid folder name");

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
