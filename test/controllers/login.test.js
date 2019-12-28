import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import bookshelf from '../../src/db';
import setCookieParser from 'set-cookie-parser';

/**
 * Tests for '/api/login'
 */
describe('Users Controller Test', () => {
  before(done => {
    bookshelf
      .knex('users')
      .truncate()
      .then(() => done());
  });

  it('should create a new user and log them in', async () => {
    const user = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jd@gmail.com',
      password: 'passowrd',
    };

    const signupResponse = await request(app)
      .post('/api/users')
      .send(user);

    const loginCreds = {
      email: user.email,
      password: user.password
    }

    const loginResponse = await request(app)
      .post('/api/login')
      .send(loginCreds);

      const data = loginResponse.body;

      expect(loginResponse.status).to.be.equal(200);
      expect(data.user).to.be.an('object');
      expect(data.user).to.have.property('id');
      expect(data.user).to.have.property('first_name');
      expect(data.user).to.have.property('created_at');
      expect(data.user).to.have.property('updated_at');
      expect(data.user.first_name).to.be.equal(user.first_name);

      const cookie = setCookieParser.parse(loginResponse.header['set-cookie'])[0]; 

      expect(cookie.name).to.eq('jwt');
  });
});
