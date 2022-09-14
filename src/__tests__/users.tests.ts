import supertest from "supertest";
import app from "../app";
import db from "../utils/prismaClient";
import "dotenv/config";

const request =  supertest(app);

beforeAll(async () => {
	await db.$connect()
		.then(() => {
			console.log("database connected successfully");
		})

		.catch((err) => {
			console.log(err);
		});
});

afterAll(async()=>{
	await db.$disconnect()
		.then(()=>{
			console.log("database disconnected successfully");
		})
		.catch((err)=>{
			console.log(err);
		});
});

describe("Sigm up test", () => {
	it("should signup user", async () => {
		const response = await request.post("/api/users").send({
			firstName: "test",
			lastName: "test",
			userName: "test111",
			email: "test11@gmail.com",
			phone: "01234567",
			password: "pass",
			confirmPassword: "pass"
		});
		console.log(response);
		
		expect(response.status).toBe(201);
		expect(response.body.message).toBe("Success");
		expect(response.body).toHaveProperty("response");
	});
});

describe("Login test", () => {
	//Login with email
	it("should login a user with email", async () => {
		const response = await request.post("/api/users/login").send({
			email: "test@gmail.com",
			password: "test",
		});
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Success");
		expect(response.body).toHaveProperty("response");
	});
	// Login with username
	it("should login a user with username", async () => {
		const response = await request.post("/api/users/login").send({
			userName: "test",
			password: "test",
		});
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Success");
		expect(response.body).toHaveProperty("response");
	});
});