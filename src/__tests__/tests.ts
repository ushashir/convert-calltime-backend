import supertest from 'supertest';
import app from "../app";
import db from "../utils/prismaClient"
import 'dotenv/config';

const request =  supertest(app)

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
        console.log("database disconnected successfully")
    })
    .catch((err)=>{
        console.log(err)
    })
})

describe('Login test', () => {


//Login with email
it('should login a user with email', async () => {
    const response = await request.post('/api/users/login').send({
      email: 'chinelo@gmail.com',
      password: 'nelo',
    });
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('User successfully logged in');
    expect(response.body).toHaveProperty('response');
});

// Login with username
it('should login a user with username', async () => {
    const response = await request.post('/api/users/login').send({
        userName: 'Nellz',
        password: 'nelo',
    });
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('User successfully logged in');
    expect(response.body).toHaveProperty('response');
  });
})