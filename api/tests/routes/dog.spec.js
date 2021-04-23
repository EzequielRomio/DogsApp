const {v4: uuidv4} = require('uuid');
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'NewDog',
  height: {a: '11 a 14', b: '78 a 98'},
  weight: {a: '11 a 14', b: '78 a 98'}, 
  temperament: 'hola, chau, 123, testing',
  id: uuidv4(),
   
};
const temperament = 'uno, dos, tres'

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => 
    conn.sync({ force: true })
    .then(() => Dog.create(dog)));

  describe('GET /dogs', () => {
    it('should get 200', () => 
      agent.get('/dogs')
        .then((res) => {
          expect(res.status).to.be.equal(200)
        })
        .catch(() => done())
    );
    it('should return names if query name in params', () => 
      agent.get('/dogs?name=NewDog')
        .then((res) => {
          expect(res.status).to.be.equal(200)
        })//
        .catch(() => done())
    );
    it('should return 404 if name not found', () => 
    agent.get('/dogs?name=NewDo')
      .then((res) => {
        expect(res.status).to.be.equal(404)
      })
      .catch(() => done())
    );
  });
  
  describe('GET /dog', () => { 
    it('should return 200 when id matchs', () => 
    agent.get(`/dog/${dog.id}`)
      .then((res) => {
        expect(res.status).to.be.equal(200)
      })
      .catch(() => done())
    );
    it('should return 404 when id NOT matchs', () => 
    agent.get(`/dog/${609}`)
      .then((res) => {
        expect(res.status).to.be.equal(404)
      })
      .catch(() => done())
    );
  });

  describe('POST /dog', () => { 
    it('responds with new dog ID', () =>
      agent.post('/dog')
        .send({...dog, name: 'TestDog', id: 1})
        .then((res) => {
          expect(res.body.id).to.be.a('string');
        })
    )
    it('response with 409 if name colision ocurred', () => 
        agent.post('/dog')
        .send({...dog, id: 2})
        .then((res) => {
          expect(res.status).to.be.equal(409)
        })
    )
    it('response with 400 if important fields are missing', () => 
        agent.post('/dog')
        .send({name: 'fake dog', id: 3})
        .then((res) => {
          expect(res.status).to.be.equal(400)
        })
    )
  })

});
