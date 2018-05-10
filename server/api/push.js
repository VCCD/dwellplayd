const router = require('express').Router()
module.exports = router


router.post('https://exp.host/--/api/v2/push/send', async (req, res, next)=>{
  try{
    res.send({
      "to": "ExponentPushToken[K9C1u6HwmglBjUVAhX1kwJ]",
      "sound": "default",
      "body": "Why'd you do my dishes, bro?"
    })
  }
  catch(err){
    next(err)
  }



})

router.post('/')