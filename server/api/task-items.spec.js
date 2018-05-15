/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Task = db.model('task')
const User = db.model('user')
const Community = db.model('community')
const CommunityTask = db.model('communityTask')
const TaskItem = db.model('taskItem')

describe('TaskItem routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/task-items/', () => {
    const taskArray = ['clean the dishes', 'sweep the floors', 'vacuum', 'clean bathroom', 'clean kitchen']

    beforeEach(async () => {
      const taskPromises = taskArray.map(name => Task.create({name}))
      await Promise.all(taskPromises)
      const task = await Task.findOne({
        where: {
          name: 'clean the dishes'
        }
      })
      const user = await User.create({
        firstName: 'test',
        lastName: 'user',
        email: 'test@test.com',
        password: '123',
      })
      const community = await Community.create({
          name: 'Community 1'
      })
      await CommunityTask.create({
        taskId: task.id,
        communityId: community.id,
        value: 5,
      })
      const taskItemCreated = await TaskItem.create({
        taskId: task.id,
        communityId: community.id,
        value: 5,
      })
    })

    it('GET /api/tasks, should return the taskItem created', () => {
      return request(app)
        .get('/api/task-items')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(1)
          expect(res.body[0].value).to.be.equal(5)
        })
    })
    it('POST /api/tasks, should get back 200 and no existing community task message if communityTask does not exist', () => {
      return request(app)
        .post('/api/task-items')
        .send({
          taskId: 10,
          communityId: 1
        })
        .expect(200)
        .then(res => {
          expect(res.text).to.be.a('string')
          expect(res.text).to.be.equal('No existing community task')
        })
    })
    it('POST /api/tasks, should get back a task created message if created', () => {
      return request(app)
        .post('/api/task-items')
        .send({
          taskId: 1,
          communityId: 1
        })
        .expect(201)
        .then(res => {
          expect(res.text).to.be.a('string')
          expect(res.text).to.be.equal('TaskItem created')
        })
    })
    it('GET /api/tasks/:taskItemId, should get back a task by id', () => {
      return request(app)
        .get('/api/task-items/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.value).to.be.equal(5)
          expect(res.body.id).to.be.equal(1)
        })
    })
    it('PUT /api/tasks/:taskItemId, should update the task and send back with not null userId and completed fields', () => {
      return request(app)
        .put('/api/task-items/1')
        .send({
          taskId: 1,
          communityId: 1,
          userId: 1,
        })
        .expect(200)
        .then(res => {
          expect(res.body[0].value).to.be.equal(5)
          expect(res.body[0].id).to.be.equal(1)
          expect(res.body[0].userId).to.be.equal(1)
          expect(res.body[0].completed).to.not.be.equal(null)
        })
    })
  })
})
