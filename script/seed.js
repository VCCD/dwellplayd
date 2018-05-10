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
      { name: 'clean the dishes' },
      { name: 'wipe the counters' },
      { name: 'sweep the floors' },
      { name: 'vacuum the carpet' },
      { name: 'feed the dog' }
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
    let taskItems = []
    for (let i = 0; i < 50; i++) {
      const randomDays = Math.random() * 120
      taskItems.push(
        {
          createdAt: new Date() - 3600000 * 24 * randomDays,
          completed: new Date() - 3600000 * 24 * (randomDays - Math.random() * randomDays % 30),
          userId: Math.floor(Math.random() * 4) + 1,
          value: Math.floor(Math.random() * 30) + 1,
          communityId: 1,
          taskId: Math.floor(Math.random() * 5) + 1,
        },
      )
    }
    taskItems.push(
      {
        createdAt: new Date() - 3600000 * 24 * 1.53,
        completed: null,
        userId: null,
        value: 6,
        communityId: 1,
        taskId: 1,
      })
      taskItems.push({
        createdAt: new Date() - 3600000 * 24 * 2.66,
        completed: null,
        userId: null,
        value: 7,
        communityId: 1,
        taskId: 2,
      })
      taskItems.push({
        createdAt: new Date() - 3600000 * 24 * 3.87,
        completed: null,
        userId: null,
        value: 8,
        communityId: 1,
        taskId: 3,
      })
      taskItems.push({
        createdAt: new Date() - 3600000 * 24 * 4.21,
        completed: null,
        userId: null,
        value: 9,
        communityId: 1,
        taskId: 4,
      })
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
