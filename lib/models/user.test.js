const Bluebird = require('bluebird');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');

const sandbox = sinon.sandbox.create();

describe('UserModel', () => {
  let mockBcrypt;
  let userModel;

  beforeEach(() => {
    mockBcrypt = {
      hash: sandbox.stub().callsArgWith(2, null, 'hashedPass'),
      compareSync: sandbox.stub().returns(true)
    };

    const mockMongoose = ({
      Schema: function() {},
      model: () => {
        function Model(obj) {
          Object.keys(obj).forEach(key  => {
            this[key] = obj[key];
          });
        };
        Model.prototype.save = function() {
          return Bluebird.resolve(this);
        };

        return Model;
      }
    });
    mockMongoose.Schema.Types = {};

    userModel = proxyquire('./user', {
      mongoose: mockMongoose,
      bcrypt: mockBcrypt
    });
  });

  afterEach(() => sandbox.restore());

  describe('.create', () => {
    it('should hash password', () => {
      const user = {
        email: 'test@email.com',
        name: 'test',
        password: '123456'
      };

      return userModel.create(user)
        .then(savedUser => {
          expect(savedUser.password).to.equal('hashedPass');
        });
    });
  });

  describe('.comparePassword', () => {
    it('should call bcrypt.compareSync', () => {
      expect(userModel.comparePassword('pass1', 'pass2')).to.be.true;
      sinon.assert.calledWith(mockBcrypt.compareSync, 'pass2', 'pass1');
    });
  });

  describe('.getProfile', () => {
    it('should return only name and email', () => {
      const user = {
        _id: 'userid',
        name: 'test',
        email: 'test@test.com',
        password: '123456',
        projects: ['p1', 'p2']
      };

      expect(userModel.getProfile(user))
        .to.be.deep.equal({
          _id: 'userid',
          name: 'test',
          email: 'test@test.com',
          projects: ['p1', 'p2']
        });
    });
  });
});
