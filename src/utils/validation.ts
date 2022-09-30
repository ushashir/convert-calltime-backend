import z from "zod";

export const loginUserSchema = z.object({
  email: z.string().email().optional(),
  userName: z.string().trim().optional(),
  password: z.string(),
});

export const emailSchema = z.object({
  email: z.string().email(),
});

export const registerUSerSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string({
      required_error: "Password is required",
    }).min(6, { message: "Password must be 6 or more characters long" }),
    confirmPassword: z.string().min(6, { message: "Confirm password must be 6 or more characters long" }),
    avatar: z.string().optional(),
    isVerified: z.boolean().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match confirm password",
      });
    }
  });

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(4).optional(),
  confirmPassword: z.string().min(4).optional(),
  avatar: z.string().optional(),
  isVerified: z.boolean().optional(),
});

export const createAccountSchema = z.object({
  bankName: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  wallet: z.number().optional().default(0),
});

export const withdrawBalanceSchema = z.object({
  bankName: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  amount: z.string(),
  password: z.string(),
});


