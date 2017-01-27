const chai= require('chai');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const Bluebird = require('bluebird');

const expect = chai.expect;
chai.use(sinonChai);

const { User } = require('../models');

const sandbox = sinon.sandbox.create();

describe('SessionsCtrl', () => {
  const profile = 'profile';
  const token = 'token';

  let sessionCtrl;
  let req;
  let res;

  beforeEach(() => {
    const jwt = {
      sign: sandbox.stub().returns(token)
    };

    sandbox.stub(User, 'findOne').returns(Bluebird.resolve({
      name: 'test',
      email: 'test@test.com',
      password: 'password'
    }));
    sandbox.stub(User, 'comparePassword').returns(true);
    sandbox.stub(User, 'getProfile').returns(profile);

    sessionCtrl = proxyquire('./sessions', {
      jsonwebtoken: jwt
    });

    req = {
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    };

    res = {
      json: sandbox.spy()
    };
    res.status = sandbox.stub().returns(res);
  });

  afterEach(() => sandbox.restore());

  describe('.create', () => {
    it('should send profile and jwt', () => {
      return sessionCtrl.create(req, res)
        .then(() => {
          expect(res.json).to.be.calledWith({ profile, token });
        });
    });

    it('should call model for user', () => sessionCtrl.create(req, res)
      .then(() => {
        expect(User.findOne).to.be.calledWith({ email: 'test@test.com' });
      }));

    it('should send 401 if user is not found', () => {
      User.findOne.returns(Bluebird.resolve(null));
      return sessionCtrl.create(req, res)
        .then(() => {
          expect(res.status).to.be.calledWith(401);
          expect(res.json).to.be.calledWith({ reason: 'User not found' });
        });
    });

    it('should send 401 if wrong password', () => {
      User.comparePassword.returns(false);

      return sessionCtrl.create(req, res)
        .then(() => {
          expect(res.status).to.be.calledWith(401);
          expect(res.json).to.be.calledWith({ reason: 'Wrong password' });
        });
    });

    it('should send 500 if mongo fails', () => {
      const uglyError = new Error('this is ugly');

      User.findOne.returns(Bluebird.reject(uglyError));
      return sessionCtrl.create(req, res)
        .then(() => {
          expect(res.status).to.be.calledWith(500);
          expect(res.json).to.be.calledWith({ reason: uglyError.message });
        });
    });
  });
});
