import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import bookshelf from '../../src/db';

/**
 * Tests for '/api/users'
 */
describe('Users Controller Test', () => {
  before(done => {
    bookshelf
      .knex('users')
      .truncate()
      .then(() => done());
  });

  it('should not create a new user if name is not provided', done => {
    const user = {
      noname: 'Jane Doe'
    };

    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        const { code, message, details } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'email');

        done();
      });
  });

  it('should create a new user with valid data', done => {
    const user = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jd@gmail.com',
      password: 'passowrd',
    };

    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(201);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('first_name');
        expect(data).to.have.property('created_at');
        expect(data).to.have.property('updated_at');
        expect(data.first_name).to.be.equal(user.first_name);

        done();
      });
  });
});
