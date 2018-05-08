/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { User, Community, Task, CommunityTask, TaskItem } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  await Community.create({
    name: 'Community',
  })


  const createUsers = async () => {
    const users = [
      {
        firstName: 'Cody',
        lastName: 'Fayolle',
        email: 'c@cody.com',
        password: '123',
        communityId: 1,
      },
      {
        firstName: 'Dave',
        lastName: 'Fudacz',
        email: 'd@dave.com',
        password: '123',
        communityId: 1,
      },
      {
        firstName: 'Chris',
        lastName: 'Miller',
        email: 'c@chris.com',
        password: '123',
        communityId: 1,
      },
      {
        firstName: 'Vi',
        lastName: 'Tran',
        email: 'v@vi.com',
        password: '123',
        communityId: 1,
      },
    ]
    try {
      const userPromises = users.map(user => {
        return User.create(user)
      })
      await Promise.all(userPromises)
      console.log('seeded the users')
    }
    catch (err) {
      console.log(err)
    }

  }
  await createUsers()
  
  const createTasks = async () => {
    const tasks = [
      { name: 'Clean the dishes' },
      { name: 'Wipe the counters' },
      { name: 'Sweep the floors' },
      { name: 'Vacuum the carpet' },
      { name: 'Feed the dog' }
    ]
    try {
      const taskPromises = tasks.map(task => {
        return Task.create(task)
      })
      await Promise.all(taskPromises)
      console.log('seeded the tasks')
    }
    catch (err) {
      console.log(err)
    }

  }
  await createTasks()

  const createCommunityTasks = async () => {
    const communityTasks = [
      {
        value: 2,
        communityId: 1,
        taskId: 3
      },
      {
        value: 5,
        communityId: 1,
        taskId: 1
      },
      {
        value: 8,
        communityId: 1,
        taskId: 2
      },
      {
        value: 15,
        communityId: 1,
        taskId: 5
      },
      {
        value: 21,
        communityId: 1,
        taskId: 4
      },
    ]
    try {
      const CommunityTaskPromises = communityTasks.map(task => {
        return CommunityTask.create(task)
      })
      await Promise.all(CommunityTaskPromises)
      console.log('seeded the communityTasks')
    }
    catch (err) {
      console.log(err)
    }

  }
  await createCommunityTasks()

  const createTaskItems = async () => {
    const taskItems = [
      {
        createdAt: new Date() - 3600000 * 23 * 5,
        completed: new Date() - 3600000 * 21 * 3,
        userId: 1,
        value: 2,
        communityId: 1,
        taskId: 1,
      },
      {
        createdAt: new Date() - 3600000 * 18 * 10,
        completed: new Date() - 3600000 * 11 * 6,
        userId: 2,
        value: 3,
        communityId: 1,
        taskId: 2,
      },
      {
        createdAt: new Date() - 3600000 * 16 * 15,
        completed: new Date() - 3600000 * 22 * 9,
        userId: 3,
        value: 4,
        communityId: 1,
        taskId: 3,
      },
      {
        createdAt: new Date() - 3600000 * 3 * 20,
        completed: new Date() - 3600000 * 7 * 12,
        userId: 4,
        value: 5,
        communityId: 1,
        taskId: 4,
      },
      {
        createdAt: new Date() - 3600000 * 9 * 1,
        completed: null,
        userId: null,
        value: 6,
        communityId: 1,
        taskId: 1,
      },
      {
        createdAt: new Date() - 3600000 * 11 * 2,
        completed: null,
        userId: null,
        value: 7,
        communityId: 1,
        taskId: 2,
      },
      {
        createdAt: new Date() - 3600000 * 19 * 3,
        completed: null,
        userId: null,
        value: 8,
        communityId: 1,
        taskId: 3,
      },
      {
        createdAt: new Date() - 3600000 * 13 * 4,
        completed: null,
        userId: null,
        value: 9,
        communityId: 1,
        taskId: 4,
      },
    ]
    try {
      const TaskItemPromises = taskItems.map(taskItem => {
        return TaskItem.create(taskItem)
      })
      await Promise.all(TaskItemPromises)
      console.log('seeded the taskItems')
    }
    catch (err) {
      console.log(err)
    }

  }
  await createTaskItems()


  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
