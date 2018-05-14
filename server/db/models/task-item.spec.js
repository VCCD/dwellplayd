/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const TaskItem = db.model('taskItem')

describe(`TaskItem model`, () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe(`taskItem instance`, async () => {
    const task = await TaskItem.create({
      value: 10,
      // communityId: 1,
      // taskId: 3,
      // userId: 1,
      compeleted: new Date() + 1000 * 60 * 60 * 24 * 3.25
    })

    it(`has value 10`, () => {
      expect(task.value.to.be.equal(10))
    })
  }) // end describe('taskItem instance')
}) // end describe('Task model')
