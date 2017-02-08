import qs from 'querystring';

const api = () => {
  let token;

  const api = {};
  Object.defineProperty(api, 'token', {
    get() {
      return token;
    },
    set(value) {
      token = value;
    }
  });

  const get = (path, query) => {
    const config = {
      method: 'GET',
      headers: {}
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const url = path + (query ? `?${qs.stringify(query)}` : '');

    return fetch(url, config)
      .then(response => response.json()
        .then(body => {
          if (!response.ok) {
            throw new Error(body.reason);
          }

          return body;
        })
      );
  };

  const post = (path, body) => {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch(path, config)
      .then(response => {
        return response.json()
          .then(body => {
            if (!response.ok) {
              throw new Error(body.reason);
            }

            return body;
          });
      })
  };

  api.getSession = credentials => post('/api/sessions', credentials)
    .then(user => {
      api.token = user.token;

      return user;
    });

  api.getProjectsByEmail = email => {
    if (!token) {
      throw new Error('Missing token');
    }

    return get('/api/projects', { user: email });
  };

  return api;
};

export default api();
