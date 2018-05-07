const router = require('express').Router()
const { Community, User } = require('../db/models')
const sendEmail = require('../mailer')
module.exports = router

//mailer takes --> email, user, community, status

router.param('communityId', async (req, res, next, communityId) => {
  try {
    req.community = await Community.findById(communityId)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/:communityId', (req, res, next) => {
  const id = req.params.communityId
  Community.findById(id, {
    include: [User]
  })
    .then(community => res.json(community))
    .catch(next)
})

router.post('/:communityId/inviteUsers', (req, res, next) => {
  try {
    const user = req.body.user
    const emails = req.body.emails
    emails.forEach(email => {
      sendEmail(email, user, req.community, 'invite')
    })
  }
  catch (err) {
    next(err)
  }
})
