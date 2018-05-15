/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Community = db.model('community')

describe('Communities routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const communityName = 'Dwell'


    beforeEach(() => {
      return Community.create({
        name: 'Dwell'
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/communities/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal(communityName)
        })
    })
  })
})
