/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const { Task, TaskItem, Community, CommunityTask } = require('../../db/models')

describe('Communities/tasks routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/communities/task-items/', () => {

    it('GET /api/communities/:communityId/tasks should return all communityTasks for a community eager loaded with Task model', async () => {
      
      const task = await Task.create({
        name: 'Clean the dishes'
      })
      const taskTwo = await Task.create({
        name: 'Clean the bathroom'
      })
      const community = await Community.create({
          name: 'Community 1'
      })
      await CommunityTask.create({
        taskId: task.id,
        communityId: community.id,
        value: 1,
      })
      await CommunityTask.create({
        taskId: taskTwo.id,
        communityId: community.id,
        value: 14,
      })
      return request(app)
        .get('/api/communities/1/tasks')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[0].task.name).to.be.equal(`Clean the dishes`)
        })
    })

    it('POST /api/communities/:communityId/tasks should create a new taskItem and send it back', async () => {
      
      const task = await Task.create({
        name: 'Clean the dishes'
      })
      const taskTwo = await Task.create({
        name: 'Clean the bathroom'
      })
      const community = await Community.create({
          name: 'Community 1'
      })

      return request(app)
        .post('/api/communities/1/tasks')
        .send({
          id: 1,
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.taskId).to.be.equal(1)
          expect(res.body.value).to.be.equal(15) //this is default in the db
        })
    })
  })
})
