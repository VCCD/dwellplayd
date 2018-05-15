/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')
const Community = db.model('community')

describe('Communities/user routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/communities/users', () => {



    beforeEach(async() => {
      const community = await Community.create({
          name: 'Community 1'
      })
      const communityTwo = await Community.create({
          name: 'Community 2'
      })
      const userOne = await User.create({
        firstName: 'First',
        lastName: 'Last',
        email: 'first@last.com',
        password: '123',
        communityId: 1,
      })
      const userTwo = await User.create({
        firstName: 'Second',
        lastName: 'Last',
        email: 'second@last.com',
        password: '123',
        communityId: 1,
      })
    })

    it('GET /api/communities/:communityId/users should return users in a community', () => {
      return request(app)
        .get('/api/communities/1/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[0].firstName).to.be.equal(`First`)
        })
    })

    it('GET /api/communities/:communityId/users should return an empty array and 200', () => {
      return request(app)
        .get('/api/communities/2/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
        })
    })
  })
})
