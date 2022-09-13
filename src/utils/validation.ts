import z from "zod";

export const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string()
});
export const registerUSerSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	userName: z.string(),
	email: z.string().email(),
	phone: z.string(),
	password: z.string().min(4),
	confirmPassword: z.string().min(4),
	avatar: z.string().optional(),
	isVerified: z.boolean().optional()
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
	isVerified: z.boolean().optional()
});
