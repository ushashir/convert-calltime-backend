// import request from "superset";
// import app from "../app";
// import config from "../utils/jest.config";


// describe("User Sign-up API Integration test", () => {
// 	it("POST /api/users - success - sign-up a user",async () => {
// 		return request(app).post(/api/users).send({
// 			firstName: "Joohn",
// 			lastName: "Dooe",
// 			userName: "jasydizzy",
// 			email: "jds@gmail.com",
// 			phone: "08023780045",
// 			password: "test",
// 			confirmPassword: "test",
// 		})
// 			.expect("Content-Type", /json/)
// 			.expect(201);
// 	});
// });

// This test fails because 1 !== 2
it('Testing to see if Jest works', () => {
  expect(1).toBe(1)
})


