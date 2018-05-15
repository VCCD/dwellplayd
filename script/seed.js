const db = require('../server/db')
const { User, Community, Task, CommunityTask, TaskItem } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  await Community.create({
    name: 'dwellbeings',
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
      { name: 'walk the dog' },
      { name: 'water the plants' },
      { name: 'takeout the trash' },
      { name: 'clean the bathroom' },
      { name: 'purge the fridge' },
    ]
    try {
      await Task.create(tasks[0])
      await Task.create(tasks[1])
      await Task.create(tasks[2])
      await Task.create(tasks[3])
      await Task.create(tasks[4])
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
        taskId: 1,
        value: 1,
        communityId: 1,
      },
      {
        taskId: 2,
        value: 3,
        communityId: 1,
      },
      {
        taskId: 3,
        value: 7,
        communityId: 1,
      },
      {
        taskId: 4,
        value: 14,
        communityId: 1,
      },
      {
        taskId: 5,
        value: 30,
        communityId: 1,
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
    const dayMs = 86400000;
    const start = new Date() - dayMs * 120
    const rando = (taskItem, today) => {
      let completed = false
      const duration = (today - taskItem.createdAt) / dayMs
      const likelihood = duration / taskItem.value
      const random = Math.random() * 2
      if (random < likelihood) completed = true
      // console.log(`value`, taskItem.value, `likelihood`, likelihood, `random`, random, `completed`, completed)
      return completed
    }
    const completedTaskItems = []
    let liveTaskItems = [
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 1,
        taskId: 1,
        communityId: 1,
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 3,
        taskId: 2,
        communityId: 1,
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 7,
        taskId: 3,
        communityId: 1,
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 14,
        taskId: 4,
        communityId: 1,
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 30,
        taskId: 5,
        communityId: 1,
      },
    ]
    for (let i = 1; i < 120; i++) {
      const today = new Date() - dayMs * (120 - i)
      liveTaskItems.forEach(liveTaskItem => {
        console.log(today)
        if (i === 119) { completedTaskItems.push(liveTaskItem) }
        if (rando(liveTaskItem, today)) {
          const completedTaskItem = {...liveTaskItem}
          completedTaskItem.userId = Math.floor(Math.random() * 4) + 1
          completedTaskItem.completed = today - Math.random() * dayMs
          completedTaskItems.push(completedTaskItem)
          liveTaskItem.createdAt = today
        }
      })
    }
    try {
      const TaskItemPromises = completedTaskItems.map(taskItem => {
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

  console.log(`seeded successfully`)
}

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

console.log('seeding...')
