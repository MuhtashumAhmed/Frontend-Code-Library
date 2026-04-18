// -- installation ==> •	npm i zod

// ======= BSic Code use most of the time ====

import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
    gender: z.enum(["male", "female", "other"]),

    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms and conditions",
    }),

    date: z.date().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.gender === "male") {
      if (!data.date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date is required for male users",
          path: ["date"],
        });
      }
    }
  });


export type UserFormValues = z.infer<typeof userSchema>;

