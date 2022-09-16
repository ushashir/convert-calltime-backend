import { userInfo } from "os";
import supertest from "supertest";
import app from "../app";
import prisma from "../utils/prismaClient";

const request = supertest(app);

const user = {
	firstName: "test",
	lastName: "test",
	userName: "test",
	email: "test@mail.com",
	phone: "02346678940",
	password: "pass",
	confirmPassword: "pass"
}

describe("Sign up test", () => {
	it("should signup user", async () => {
		const response = await request.post("/api/users").send(user);
		expect(response.status).toBe(201);
		expect(response.body.message).toBe("Success");
		expect(response.body).toHaveProperty("response");
	});
});

describe("Login test", () => {
	//Login with email
	it("should login a user with email", async () => {
		const response = await request.post("/api/users/login").send({
			email: user.email,
			password: user.password,
		});
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Success");
		expect(response.body).toHaveProperty("response");
	});
	// Login with username
	it("should login a user with username", async () => {
		const response = await request.post("/api/users/login").send({
			userName: user.userName,
			password: user.password,
		});
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Success");
		expect(response.body).toHaveProperty("response");
	});
});

describe("Update user test", () => {
	it("should update user", async () => {
		const userdata = await prisma.user.findUnique({ where: { email: user.email } })
		const response = await request.patch(`/api/users/${userdata?.id}`).send({
			avatar: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8anBnfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
			firstName: "test_updated",
			lastName: "test_updated",
			phone: "01234566"
		});

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Success");
		expect(response.body).toHaveProperty("response");
	});
});

describe("Forgot password test",  () => { 
	it("should send reset link mail", async () => {
		const response = await request.post("/api/users/forgotpassword").send({
			email: user.email
		});
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Check your email to reset your password");
	});
	it("should not send mail to invalid user", async()=> {
		const response = await request.post("/api/users/forgotpassword").send({
			email: "invalid@mail.com"
		});
		expect(response.status).toBe(400);
		expect(response.body.message).toBe("User does not exist");
	});

});

describe("Reset db", () => {
	it("should delete user", async () => {
		 await prisma.user.delete({where:{email: user.email}})
	})
})