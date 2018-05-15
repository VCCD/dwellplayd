/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Task = db.model('task')

describe('Task routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/tasks/', () => {
    const taskName = 'sweep the floors'

    beforeEach(async () => {
      await Task.create({
        name: taskName,
      })
      return ''
    })

    it('Post /api/tasks, new task count = 1', () => {
      return request(app)
        .post('/api/tasks')
        .send({name: 'clean the dishes'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.count).to.be.equal(1)
        })
    })
    it('Post /api/tasks, duplicate task increments count', () => {
      return request(app)
        .post('/api/tasks')
        .send({name: taskName})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.count).to.be.equal(2)
        })
    })
  })

  describe('/api/tasks/, query', () => {
    const taskName = 'sweep the floors'

    beforeEach(async () => {
      await Task.create({
        name: taskName,
      })
      return ''
    })

    it('Get /api/tasks, only returns query amount', async () => {
      try {
        const taskArray = ['clean the dishes', 'sweep the floors', 'vacuum', 'clean bathroom', 'clean kitchen']
        const taskPromises = taskArray.map((task) => {
          Task.create({name: task})
        })
        await Promise.all(taskPromises)
        return request(app)
          .get('/api/tasks/?popular=5')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.be.equal(5)
            expect(res.body[0].name).to.be.equal('Sweep the floors')
          })
      }
      catch (err) {
        console.log(err)
      }
    })
  })
})
