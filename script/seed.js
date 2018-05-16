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
        // hasSeenTutorials: true,
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
      { name: 'get the mail' },
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
    const dayMs = 86400000
    const start = new Date() - dayMs * 135
    const taskToday = (taskItem, today) => {
      let completed = false
      const x = (today - taskItem.createdAt) / dayMs
      const z = taskItem.value
      const e = Math.E
      const points = (16 * z ** 0.6) / (1 + e ** (3 * (1 - x / z))) - (16 * z ** 0.6) / (1 + e ** 3)
      const threshold = Math.random() * taskItem.value * 15
      if (points > threshold) completed = true
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
        imgUrl: `https://storage.googleapis.com/dwellplayd/user-1526484728047.jpg`
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 3,
        taskId: 2,
        communityId: 1,
        imgUrl: `https://storage.googleapis.com/dwellplayd/user-1526484879930.jpg`
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 7,
        taskId: 3,
        communityId: 1,
        imgUrl: `https://storage.googleapis.com/dwellplayd/user-1526484266342.jpg`
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 14,
        taskId: 4,
        communityId: 1,
        imgUrl: `https://storage.googleapis.com/dwellplayd/user-1526484195059.jpg`
      },
      {
        createdAt: start,
        completed: null,
        userId: null,
        value: 30,
        taskId: 5,
        communityId: 1,
        imgUrl: `https://storage.googleapis.com/dwellplayd/user-1526484246825.jpg`
      },
    ]
    for (let i = 0; i < 135; i++) {
      const today = new Date() - dayMs * (135 - i)
      liveTaskItems.forEach(liveTaskItem => {
        if (i === 119) { completedTaskItems.push(liveTaskItem) }
        if (taskToday(liveTaskItem, today)) {
          const completedTaskItem = { ...liveTaskItem }
          completedTaskItem.userId = Math.floor(Math.random() * 4) + 1
          const newToday = today - Math.random() * dayMs * 0.25
          completedTaskItem.completed = newToday
          completedTaskItems.push(completedTaskItem)
          liveTaskItem.createdAt = newToday
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
