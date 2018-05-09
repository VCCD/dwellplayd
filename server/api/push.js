const router = require('express').Router()


router.post('https://exp.host/--/api/v2/push/send', async (req, res, next)=>{
  try{
    res.send({
      "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
      "sound": "default",
      "body": "Hello world!"
    })
  }
  catch(err){
    next(err)
  }



})