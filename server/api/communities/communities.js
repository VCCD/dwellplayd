const router = require('express').Router()
const { Community, User, TaskItem } = require('../../db/models')
const sendEmail = require('../../mailer')
module.exports = router

//mailer takes --> email, user, community, status

router.param('communityId', async (req, res, next, communityId) => {
  try {
    req.community = await Community.findById(communityId, {
      include: [User, TaskItem]
    })
    next()
  }
  catch (err) {
    next(err)
  }
})

router.use('/:communityId/tasks', require('./tasks'))
router.use('/:communityId/users', require('./users'))


router.get('/:communityId', (req, res, next) => {
  res.json(req.community)
})

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name
    console.log(req.body)
    const newCommunity = await Community.create({name})
    res.json(newCommunity)
  }
  catch (err) {
    next(err)
  }
})

router.post('/:communityId/inviteUsers', (req, res, next) => {
  const user = req.body.user
  const emails = req.body.emails
  emails.forEach(email => {
    sendEmail(email, user, req.community, 'invite')
  })

})

