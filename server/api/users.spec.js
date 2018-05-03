/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codysFirstName = 'Cody'
    const codysLastName = 'Fayolle'


    beforeEach(() => {
      return User.create({
        firstName: codysFirstName,
        lastName: codysLastName,
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          console.log(res.body)
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
          expect(res.body[0].firstName).to.be.equal(codysFirstName)
          expect(res.body[0].lastName).to.be.equal(codysLastName)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
