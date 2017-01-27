const { mongo, seed, app } = require('./support');

const api = app.api;

describe('Session API', () => {
  beforeEach(() => mongo.up()
    .then(() => seed.up())
    .then(() => app.up()));

  afterEach(() => app.down()
    .then(() => seed.down())
    .then(() => mongo.down()));

  describe('POST /api/sessions', () => {
    it('should return 401 if user does not exist', () => {
      return api.post('/api/sessions')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: 'unknown', password: '123456' }))
        .expect(401)
        .expect(({ body }) => {
          expect(body.reason).toBe('User not found');
        });
    });

    it('should return 401 if user password doesnt match', () => {
      return api.post('/api/sessions')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: 'admin@test.com', password: '123456' }))
        .expect(401)
        .expect(({ body }) => {
          expect(body.reason).toBe('Wrong password');
        });
    });

    it('should return a token if user authenticates', () => {
      return api.post('/api/sessions')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ email: 'admin@test.com', password: 'admin' }))
        .expect(200)
        .expect(({ status, body }) => {
          expect(body).toEqual({
            profile: {
              name: 'admin',
              email: 'admin@test.com'
            },
            token: expect.any(String)
          });
        });
    });
  });
});
