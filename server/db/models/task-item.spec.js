/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const TaskItem = db.model('taskItem')

describe(`TaskItem model`, () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe(`taskItem instance`, () => {
    let taskItem;
    const completed = (new Date() + 1000 * 60 * 60 * 24 * 4.25)
    console.log(`completed >>>>`, completed)
    beforeEach(() => {
      return TaskItem.create({
        value: 10,
        completed
      })
        .then(item => {
          console.log(item.dataValues)
          taskItem = item
        })
    })

    it(`tests something`, () => {
      expect(taskItem.value).to.be.equal(10)
    })

  }) // end describe('taskItem instance')
}) // end describe('Task model')
