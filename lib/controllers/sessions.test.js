const sinon = require('sinon');
const proxyquire = require('proxyquire');
const Bluebird = require('bluebird');
const { expect } = require('chai');

const sandbox = sinon.sandbox.create();

describe('SessionsCtrl', () => {
  const profile = 'profile';
  const token = 'token';

  let sessionsCtrl;
  let mockUser;
  let mockJsonwebtoken;
  let req;
  let res;

  beforeEach(() => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      password: 'password'
    };

    mockUser = {
      findOne: sandbox.stub().returns(Bluebird.resolve(user)),
      comparePassword: sandbox.stub().returns(true),
      getProfile: sandbox.stub().returns(profile)
    };

    mockJsonwebtoken = {
      sign: sandbox.stub().returns(token)
    };

    req = {
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    };

    res = {
      json: sandbox.spy(),
      status: sandbox.stub().returnsThis()
    };

    sessionsCtrl = proxyquire('./sessions', {
      '../models': { User: mockUser },
      jsonwebtoken: mockJsonwebtoken
    });
  });

  afterEach(() => sandbox.restore());

  describe('.create', () => {
    it('should send profile and jwt', () => sessionsCtrl.create(req, res)
      .then(() => {
        sinon.assert.calledWith(res.json, { profile, token });
      }));

    it('should call model for user', () => sessionsCtrl.create(req, res)
      .then(() => {
        sinon.assert.calledWith(mockUser.findOne, { email: 'test@test.com' });
      }));

    it('should send 401 if user is not found', () => {
      mockUser.findOne.returns(Bluebird.resolve(null));

      return sessionsCtrl.create(req, res)
        .then(() => {
          sinon.assert.calledWith(res.status, 401);
          sinon.assert.calledWith(res.json, { reason: 'User not found' });
        });
    });

    it('should send 401 if wrong password', () => {
      mockUser.comparePassword.returns(false);

      return sessionsCtrl.create(req, res)
        .then(() => {
          sinon.assert.calledWith(res.status, 401);
          sinon.assert.calledWith(res.json, { reason: 'Wrong password' });
        });
    });

    it('should send 500 if mongo fails', () => {
      const uglyError = new Error('this is ugly');

      mockUser.findOne.returns(Bluebird.reject(uglyError));
      return sessionsCtrl.create(req, res)
        .then(() => {
          sinon.assert.calledWith(res.status, 500);
          sinon.assert.calledWith(res.json, { reason: uglyError.message });
        });
    });
  });
});
