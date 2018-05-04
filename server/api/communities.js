const router = require('express').Router()
const { Community, User } = require('../db/models')
module.exports = router

router.get('/:communityId', (req, res, next) => {
  const id = req.params.communityId
  Community.findById(id, {
    include: [User]
  })
    .then(community => res.json(community))
    .catch(next)
})
