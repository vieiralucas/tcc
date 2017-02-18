import qs from 'querystring';
import { push } from 'react-router-redux';

import { logoutUser } from '../actions/login';

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

  let store;
  api.setStore = value => {
    store = value;
  };

  const performRequest = (path, config) => fetch(path, config)
    .then(response => {
      return response.json()
        .then(body => {
          if (response.status === 401 && store) {
            store.dispatch(logoutUser());
            store.dispatch(push('/login'));
          }

          if (!response.ok) {
            return Promise.reject({
              status: response.status,
              body
            });
          }

          return body;
        });
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

    return performRequest(url, config);
  };

  const post = (path, body) => {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return performRequest(path, config);
  };

  const put = (path, body) => {
    const config = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return performRequest(path, config);
  };

  api.getSession = credentials => post('/api/sessions', credentials)
    .then(user => {
      api.token = user.token;
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });

  api.getProjectsByEmail = email => {
    if (!token) {
      throw new Error('Missing token');
    }

    return get('/api/projects', { user: email });
  };

  api.createProject = project => {
    if (!token) {
      throw new Error('Missing token');
    }

    return post('/api/projects', project);
  };

  api.updateUser = user => {
    if (!token) {
      throw new Error('Missing token');
    }

    return put(`/api/users/${user._id}`, user)
      .then(user => {
        try {
          const localStorageUser = JSON.parse(localStorage.getItem('user'));
          localStorageUser.profile = user;
          localStorage.setItem('user', JSON.stringify(localStorageUser));
        } catch(e) {
          store.dispatch(push('/login'));
          return;
        }

        return user;
      });
  };

  api.getUsecasesForProject = projectId => {
    if (!token) {
      throw new Error('Missing token');
    }

    return get(`/api/projects/${projectId}/usecases`);
  };

  return api;
};

export default api();
