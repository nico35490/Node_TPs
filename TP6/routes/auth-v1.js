const express = require('express')
const router = express.Router()

let authModel = undefined


/* Control auth initialisation */
router.use((req, res, next) => {
    /* istanbul ignore if */
    if (!authModel) {
      res
        .status(500)
        .json({message: 'model not initialised'})
    }
    next()
})

/* Try to authenticate */
router.post('/login', function (req, res, next) {

    login = req.body.login
    password = req.body.password
    /* istanbul ignore else */
    if (login && password) {
      try {
        const jwt = authModel.login(login, password)
        if(jwt)
            res
            .status(200)
            .json(jwt)
        else{
          
          res.status(401).json({code : 0,type : "credential error", message : "try again"})
        }
      } catch (exc) {
        res
          .status(400)
          .json({message: exc.message})
      }
    } else {
      res
        .status(400)
        .json({message: 'Wrong parameters'})
    }
})

/* Try to authenticate */
router.get('/verifyaccess', function (req, res, next) {

    /* istanbul ignore else */
      try {
        req
          .res
          .status(200)
          .send({message : "ok"})
      } catch (exc) {
        res
          .status(400)
          .json({message: exc.message})
      }
})

  module.exports = (model) => {
    authModel = model
    return router
  }