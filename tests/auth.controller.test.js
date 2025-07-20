// tests/auth.controller.test.js

// Integration tests for authentication endpoints
require('dotenv').config();

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user.model');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
  });

  it('should login a user', async () => {
    await User.create({ username: 'testuser2', password: 'testpass2' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser2', password: 'testpass2' });
    expect(res.statusCode).toEqual(200);
  });
});
