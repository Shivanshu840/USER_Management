const request = require('supertest');
require('dotenv').config();
const app = require('../index'); 
const mongoose = require('mongoose');
const {USER} = require('../Db/db'); 


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


afterEach(async () => {
  await USER.deleteMany({});
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Registration', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register/signup')
      .send({
        username: 'testuser',
        useremail: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
   
  });

  it('should not register a user with an existing email', async () => {
    await request(app)
      .post('/register/signup')
      .send({
        username: 'testuser',
        useremail: 'test@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/register/signup')
      .send({
        username: 'testuser2',
        useremail: 'test@example.com',
        password: 'password1234',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg', 'User already exists');
  });
});

describe('User Login', () => {
  it('should login a user with correct credentials', async () => {
    await request(app)
      .post('/register/signup')
      .send({
        username: 'testuser',
        useremail: 'test@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/register/login')
      .send({
        useremail: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login a user with incorrect credentials', async () => {
    await request(app)
      .post('/register/signup')
      .send({
        username: 'testuser',
        useremail: 'test@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/register/login')
      .send({
        useremail: 'test@example.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg', 'Invalid credentials');
  });
});

describe('Profile Retrieval', () => {
    it('should retrieve the user profile', async () => {
        
        const registerRes = await request(app)
          .post('/register/signup')
          .send({
            username: 'testuser',
            useremail: 'test@example.com',
            password: 'password123',
          });
    
       
        const loginRes = await request(app)
          .post('/register/login')
          .send({
            useremail: 'test@example.com',
            password: 'password123',
          });
    
        const token = loginRes.body.token;
    
        
        const res = await request(app)
          .get('/userprofile/profile')
          .set('authorization', token); 
    
       
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('username', 'testuser');
        expect(res.body).toHaveProperty('useremail', 'test@example.com');
        expect(res.body).not.toHaveProperty('password'); 
    });

  it('should not retrieve profile without token', async () => {
    const res = await request(app)
      .get('/userprofile/profile');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('msg', ' Access denied.');
  });
});
