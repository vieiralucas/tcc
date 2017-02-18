const { expect } = require('chai');

const { app, token } = require('./support');
const { Usecase, Project } = require('../lib/models');

const api = app.api;

describe('UseCases API', () => {
  describe('POST /api/projects/:projectId/usecases', () => {
    let project;

    beforeEach(() => Project.findOne({})
      .then(_project => {
        project = JSON.parse(JSON.stringify(_project));
      })
    );

    it('should need authentication', () => {
      return api.post(`/api/projects/${project._id}/usecases`)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ name: 'usecase', description: 'usecase description' }))
        .expect(401);
    });

    it('should create a new usecase', () => {
      let body;

      return api.post(`/api/projects/${project._id}/usecases`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(JSON.stringify({
          name: 'usecase',
          description: 'usecase description'
        }))
        .expect(201)
        .expect(({ body: _body }) => {
          expect(_body).to.have.property('name', 'usecase');
          expect(_body).to.have.property('description', 'usecase description');
          expect(_body).to.have.property('_id').which.is.a('string');
          expect(_body).to.have.property('project', project._id);

          body = _body;
        })
        .then(() => Usecase.findById(body._id)
          .then(usecase => {
            expect(JSON.parse(JSON.stringify(usecase))).to.deep.equal(body);
          })
        );
    });

    it('should send 400 if invalid data', () => api.post(`/api/projects/${project._id}/usecases`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(JSON.stringify({
        description: 'usecase description'
      }))
      .expect(400)
      .expect(({ body }) => {
        expect(body).to.have.property('message', 'Usecase validation failed');
      })
    );

    it('should send 404 if projectId does not exists', () => {
      const id = '58a4fc3be818ee667ff53e3d';
      return api.post(`/api/projects/${id}/usecases`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(JSON.stringify({
          name: 'usecase',
          description: 'usecase description'
        }))
        .expect(404)
        .expect(({ body }) => {
          expect(body).to.have.property('message', `Project ${id} not found`);
        });
    });
  });
});
