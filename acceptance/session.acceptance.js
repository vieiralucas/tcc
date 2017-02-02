const { app } = require('./support');
const { expect } = require('chai');

const api = app.api;

describe('Session API', () => {
  describe('POST /api/sessions', () => {
    it('should return 401 if user does not exist', () => {
      return api.post('/api/sessions')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: 'unknown', password: '123456' }))
        .expect(401)
        .expect(({ body }) => {
          expect(body).to.have.property('reason', 'User not found');
        });
    });

    it('should return 401 if user password doesnt match', () => {
      return api.post('/api/sessions')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: 'admin@test.com', password: '123456' }))
        .expect(401)
        .expect(({ body }) => {
          expect(body).to.have.property('reason', 'Wrong password');
        });
    });

    it('should return a token if user authenticates', () => {
      return api.post('/api/sessions')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: 'admin@test.com', password: 'admin' }))
        .expect(200)
        .expect(({ status, body }) => {
          expect(body).to.have.property('profile').eql({
            name: 'admin',
            email: 'admin@test.com'
          });

          expect(body).to.have.property('token').which.is.a('string');
        });
    });
  });
});
