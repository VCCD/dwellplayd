/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const TaskItem = db.model('taskItem')

describe(`TaskItem model`, () => {
  let taskItem;
  const createdAt = (Number(new Date()) - 1000 * 60 * 60 * 24 * 3)
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe(`virtual attributes (days/points)`, () => {

    describe(`incomplete taskItem`, () => {
      beforeEach(() => {
        return TaskItem.create({
          value: 10,
          createdAt
        })
          .then(item => {
            taskItem = item
          })
      })

      it(`calculates days since last completed`, () => {
        expect(taskItem.days).to.be.equal(3)
      })
      it(`calculates current points`, () => {
        expect(taskItem.points).to.be.equal(30)
      })
    })

    describe(`completed taskItem`, () => {
      beforeEach(() => {
        const completed = createdAt + 1000 * 60 * 60 * 24 * 5
        taskItem.update({ completed })
      })

      it(`calculates days from created to completed`, () => {
        expect(taskItem.days).to.be.equal(5)
      })
      it(`calculates total points`, () => {
        expect(taskItem.points).to.be.equal(50)
      })

    }) // end describe('taskItem instance')
  })
}) // end describe('Task model')