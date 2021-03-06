import api from './index';

describe('API', () => {
  let fetchBody;

  beforeEach(() => {
    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key];
      }

      setItem(key, value) {
        this.store[key] = value.toString();
      }
    };

    global.localStorage = new LocalStorageMock;

    fetchBody = { data: 'from backend' };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(fetchBody),
      ok: true
    }));
    api.token = undefined;
  });

  afterEach(() => {
    delete global.localStorage;
  });

  describe('.getSession', () => {
    const credentials = {
      email: 'cool@email.com',
      password: '123456'
    };

    it('should post credentials to /api/sessions', () => {
      api.getSession(credentials);
      expect(fetch).toHaveBeenCalledWith('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
    });

    it('should set token', () => {
      fetchBody = { token: 'super token' };

      return api.getSession(credentials)
        .then(() => {
          expect(api.token).toBe('super token');
        });
    });
  });

  describe('.getProjectsByUser', () => {
    it('should throw error if no token', () => {
      expect(() => {
        api.getProjectsByEmail('cool@email.com')
      }).toThrowError('Missing token');
    });

    it('should fetch projects passing encoded email and token', () => {
      api.token = 'super token';
      api.getProjectsByEmail('cool@email.com');

      expect(fetch).toHaveBeenCalledWith('/api/projects?user=cool%40email.com', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer super token'
        }
      });
    });
  });

  describe('.getUsecasesForProject', () => {
    it('should throw error if no token', () => {
      expect(() => {
        api.getUsecasesForProject('1234');
      }).toThrowError('Missing token');
    });

    it('should fetch usecases passing project and token', () => {
      api.token = 'super token';
      api.getUsecasesForProject('1234');

      expect(fetch).toHaveBeenCalledWith('/api/projects/1234/usecases', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer super token'
        }
      });
    });
  });

  describe('.createUseCase', () => {
    let usecase;

    beforeEach(() => {
      usecase = {
        name: 'usecase',
        description: 'description',
        project: '123'
      };
    });

    it('should throw error if no token', () => {
      expect(() => {
        api.createUsecase(usecase);
      }).toThrowError('Missing token');
    });

    it('should make a post with usecase', () => {
      api.token = 'super token';
      api.createUsecase(usecase);

      expect(fetch).toHaveBeenCalledWith('/api/projects/123/usecases', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer super token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usecase)
      });
    });
  });
});
