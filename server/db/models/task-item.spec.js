/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const TaskItem = db.model('taskItem')

describe(`TaskItem model`, () => {
  const roundToTenths = num => {
    return Math.round(num * 10) / 10 < 0 ? 0 : Math.round(num * 10) / 10
  }

  const calcPoints = (days, value) => {
    const x = days
    const z = value
    const e = Math.E
    const points = (16 * z ** 0.6) / (1 + e ** (3 * (1 - x / z))) - (16 * z ** 0.6) / (1 + e ** 3)
    return roundToTenths(points)
  }
  let taskItem;
  const createdAt = (Number(new Date()) - 1000 * 60 * 60 * 24 * 3)
  const now = createdAt + 1000 * 60 * 60 * 24 * 3
  const value = 10
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe(`virtual attributes (days/points)`, () => {

    describe(`incomplete taskItem`, () => {
      beforeEach(() => {
        return TaskItem.create({
          value,
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
        expect(taskItem.points).to.be.equal(calcPoints(3, value))
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
        expect(taskItem.points).to.be.equal(calcPoints(5, value))
      })

    }) // end describe('taskItem instance')
  })
}) // end describe('Task model')