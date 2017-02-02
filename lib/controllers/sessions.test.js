const Bluebird = require('bluebird');

describe('SessionsCtrl', () => {
  const profile = 'profile';
  const token = 'token';

  let sessionsCtrl;
  let mockUser;
  let req;
  let res;

  beforeEach(() => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      password: 'password'
    };

    mockUser = {
      findOne: jest.fn(() => Bluebird.resolve(user)),
      comparePassword: jest.fn(() => true),
      getProfile: jest.fn(() => profile)
    };

    jest.mock('../models', () => ({ User: mockUser }));

    jest.mock('jsonwebtoken', () => ({
      sign: jest.fn(() => 'token')
    }));

    req = {
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    sessionsCtrl = require('./sessions');
  });

  afterEach(() => jest.resetModules());

  describe('.create', () => {
    it('should send profile and jwt', () => {
      return sessionsCtrl.create(req, res)
        .then(() => {
          expect(res.json).toHaveBeenCalledWith({ profile, token });
        });
    });

    it('should call model for user', () => sessionsCtrl.create(req, res)
      .then(() => {
        expect(mockUser.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
      }));

    it('should send 401 if user is not found', () => {
      mockUser.findOne.mockReturnValueOnce(Bluebird.resolve(null));
      return sessionsCtrl.create(req, res)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(401);
          expect(res.json).toHaveBeenCalledWith({ reason: 'User not found' });
        });
    });

    it('should send 401 if wrong password', () => {
      mockUser.comparePassword.mockReturnValueOnce(false);

      return sessionsCtrl.create(req, res)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(401);
          expect(res.json).toHaveBeenCalledWith({ reason: 'Wrong password' });
        });
    });

    it('should send 500 if mongo fails', () => {
      const uglyError = new Error('this is ugly');

      mockUser.findOne.mockReturnValueOnce(Bluebird.reject(uglyError));
      return sessionsCtrl.create(req, res)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ reason: uglyError.message });
        });
    });
  });
});
