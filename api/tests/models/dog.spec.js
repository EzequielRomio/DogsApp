const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', (done) => {
        Dog.create({name: 'pug'})
        .then(() => done())
        .catch(() => done())
      });
      it('should throw an error if colision ocurred', (done) => {
        Dog.create({name: 'pug'})
        .then(() => done(new Error('Name is Unique')))
        .catch(() => done())
      })
    });
  });
});
