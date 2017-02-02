const { expect } = require('chai');

const { app } = require('./support');
const { User, Project } = require('../lib/models');

const api = app.api;

describe('Projects API', () => {
  describe('POST /api/projects', () => {
    it('should create a new project', () => {
      return api.post('/api/projects')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ name: 'project', description: 'project description' }))
        .expect(201)
        .expect(({ body }) => {
          expect(body).to.have.property('name', 'project');
          expect(body).to.have.property('description', 'project description');
          expect(body).to.have.property('_id').which.is.a('string');
        });
    });
  });

  describe('GET /api/projects', () => {
    it('should list all projects', () => {
      return api.get('/api/projects')
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body).to.be.an('array');
          expect(body).to.have.length(1);
          expect(body[0]).to.have.property('name', 'tcc');
          expect(body[0]).to.have.property('description', 'Final project');
        });
    });

    describe('if user is supplied', () => {
      it('should send 404 if user is not found', () => {
        return api.get('/api/projects')
          .query({ user: 'unknown' })
          .set('Content-Type', 'application/json')
          .expect(404)
          .expect(({ body }) => {
            expect(body).to.have.property('message', 'User unknown not found');
          });
      });

      it('should list projects for given user', () => {
        let project;

        return Project.findOne({})
          .then(p => {
            project = p;

            return User.create({
              name: 'with project',
              email: 'with@project.com',
              password: 'secret password',
              projects: [project._id] 
            });
          })
          .then(user => {
            return api.get('/api/projects')
              .query({ user: 'with@project.com' })
              .set('Content-Type', 'application/json')
              .expect(200)
              .expect(({ body }) => {
                expect(body).to.be.an('array');
                expect(body).to.have.length(1);
                expect(body[0]).to.have.property('_id', '' + project._id);
              });
          })
      });
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should get project by id', () => {
      return Project.findOne({})
        .then(project => {
          return api.get(`/api/projects/${project._id}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect(({ body }) => {
              expect(body).to.have.property('_id', '' + project._id);
              expect(body).to.have.property('name', project.name);
              expect(body).to.have.property('description', project.description);
            });
        });
    });

    it('should send 400 if supplied id is invalid', () => {
      return api.get('/api/projects/123456')
        .set('Content-Type', 'application/json')
        .expect(400);
    });

    it('should send 404 if project is not found', () => {
      return api.get('/api/projects/58931694a7f04980f74af8c9')
        .set('Content-Type', 'application/json')
        .expect(404);
    });
  });
});
