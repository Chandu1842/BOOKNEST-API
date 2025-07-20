// tests/book.controller.test.js

// Integration tests for book controller endpoints
jest.setTimeout(30000); // Increase timeout to 30 seconds for slow DB operations


require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Book = require('../src/models/book.model');

let token;

describe('Book API', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    // Ensure test user is removed before creating
    await require('../src/models/user.model').deleteMany({ username: 'testuser' });
    // Register and login a user to get a JWT token
    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpass',
        role: 'admin'
      });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Book.deleteMany();
  });

  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Clean Code 3',
        author: 'Robert C. Martin',
        publishedDate: '2008-08-01'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Clean Code 3');
    expect(res.body).toHaveProperty('author', 'Robert C. Martin');
    expect(res.body).toHaveProperty('publishedDate');
    // Save book id for update/delete tests
    global.bookId = res.body._id;
  });

  it('should update a book', async () => {
    // Create a book first
    const book = await Book.create({ title: 'Old Title', author: 'Author', publishedDate: '2000-01-01' });
    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Avengers',
        author: 'Robert C. Martin',
        publishedDate: '2008-08-01'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Avengers');
  });

  it('should delete a book', async () => {
    // Create a book first
    const book = await Book.create({ title: 'To Delete', author: 'Author', publishedDate: '2000-01-01' });
    const res = await request(app)
      .delete(`/api/books/${book._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Book deleted');
  });

  it('should get all books', async () => {
    await Book.create({ title: 'Book1', author: 'Author1', isbn: '111' });
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
