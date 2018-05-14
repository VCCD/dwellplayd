/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const TaskItem = db.model('taskItem')

describe(`TaskItem model`, () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe(`taskItem instance`, () => {
    let testTaskItem;
    beforeEach(() => {
      return TaskItem.create({
        value: 10,
      })
        .then(taskItem => {
          testTaskItem = taskItem
          testTaskItem.update({
            completed: new Date() + 1000 * 60 * 60 * 24 * 3.25
          })
        })
    })
    
    it(`tests something`, () => {
      console.log(testTaskItem)
      expect(testTaskItem.value).to.be.equal(10)
    })

  }) // end describe('taskItem instance')
}) // end describe('Task model')
