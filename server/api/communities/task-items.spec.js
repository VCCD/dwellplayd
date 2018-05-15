/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const { Task, TaskItem, Community, CommunityTask } = require('../../db/models')

describe('Communities/task-items routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/communities/task-items/', () => {
    beforeEach(async () => {
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
      const taskItemOneCreated = await TaskItem.create({
        taskId: task.id,
        communityId: community.id,
        value: 1,
      })
      const taskItemTwoCreated = await TaskItem.create({
        taskId: taskTwo.id,
        communityId: community.id,
        value: 14,
      })
    })

    it('GET /api/communities/:communityId/task-items should return all taskItems for a community eager loaded with Task model', () => {
      return request(app)
        .get('/api/communities/1/task-items')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[0].task.name).to.be.equal(`Clean the dishes`)
        })
    })

    it('POST /api/communities/:communityId/users should create a new taskItem and send it back', () => {
      return request(app)
        .post('/api/communities/1/task-items')
        .send({
          taskId: 1,
          communityId: 1,
          value: 5,
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.taskId).to.be.equal(1)
          expect(res.body.value).to.be.equal(5)
        })
    })
  })
})
