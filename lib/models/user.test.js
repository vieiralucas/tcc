const Bluebird = require('bluebird');

describe('UserModel', () => {
  let mockBcrypt;
  let userModel;

  beforeEach(() => {
    mockBcrypt = {
      hash: jest.fn((pass, saltRounds, cb) => cb(null, 'hashedPass')),
      compareSync: jest.fn(() => true)
    };
    jest.mock('bcrypt', () => mockBcrypt);

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
    jest.mock('mongoose', () => mockMongoose);

    userModel = require('./user');
  });

  afterEach(() => jest.resetModules());

  describe('.create', () => {
    it('should hash password', () => {
      const user = {
        email: 'test@email.com',
        name: 'test',
        password: '123456'
      };

      return userModel.create(user)
        .then(savedUser => {
          expect(savedUser.password).toBe('hashedPass');
        });
    });
  });

  describe('.comparePassword', () => {
    it('should call bcrypt.compareSync', () => {
      expect(userModel.comparePassword('pass1', 'pass2')).toBe(true);
      expect(mockBcrypt.compareSync).toHaveBeenCalledWith('pass2', 'pass1');
    });
  });

  describe('.getProfile', () => {
    it('should return only name and email', () => {
      expect(userModel.getProfile({ name: 'test', email: 'test@test.com', password: '123456' }))
        .toEqual({
          name: 'test',
          email: 'test@test.com'
        });
    });
  });
});
