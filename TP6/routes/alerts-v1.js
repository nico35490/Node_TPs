const express = require('express')
const router = express.Router()

let alertsModel = undefined

/* Control usermodel initialisation */
router.use((req, res, next) => {
  /* istanbul ignore if */
  if (!alertsModel) {
    res
      .status(500)
      .json({message: 'model not initialised'})
  }
  next()
})

router.post('/', function (req, res, next) {
  const newAlert = req.body

  /* istanbul ignore else */
  if (newAlert) {
    try {
      const alert = alertsModel.add(newAlert)
      req
        .res
        .status(200)
        .send(alert)
    } catch (exc) {
      res
        .status(405)
        .json({message: exc.message})
    }
  } else {
    res
      .status(405)
      .json({message: 'Wrong parameters'})
  }
})

router.get('/search', function (req, res, next) {
  const status = req.params['status']

  /* istanbul ignore else */
  if (status) {
    try {
      const alerts = alertsModel.getFromSearch(status)
      req
        .res
        .status(200)
        .send(alerts)
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
router.get('/:id', function (req, res, next) {
  const id = req.params.id

   /* istanbul ignore else */
   if (id) {
    try {
      const alertFound = alertsModel.get(id)
      if (alertFound) {
        res.json(alertFound)
      } else {
        res
          .status(404)
          .json({code : 0,type : "Alert not found", message : `Alert not found with id ${id}`})
      }
    } catch (exc) {
      /* istanbul ignore next */
      res
        .status(400)
        .json({message: exc.message})
    }

  } else {
    res
      .status(400)
      .json({message: 'Wrong parameter'})
  }
})

router.put('/:id', function (req, res, next) {
  const id = req.params.id
  const newAlertProperties = req.body

  /* istanbul ignore else */
  if (id && newAlertProperties) {
    try {
      const updated = alertsModel.update(id, newAlertProperties)
      res
        .status(200)
        .json(updated)

    } catch (exc) {

      if (exc.message === 'alert.not.found') {
        res
          .status(404)
          .json({code : 0,type : "alert not found", message : `alert not found with id ${id}`})
      } else {
        res
          .status(400)
          .json({message: 'Invalid alert data'})
      }
    }
  } else {
    res
      .status(405)
      .json({message: 'Wrong parameters'})
  }
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id

  /* istanbul ignore else */
  if (id) {
    try {
      alertsModel.remove(id)
      req
        .res
        .status(200)
        .end()
    } catch (exc) {
      /* istanbul ignore else */
      if (exc.message === 'alert.not.found') {
        res
          .status(404)
          .json({code : 0,type : "Alert not found", message : `Alert not found with id ${id}`})
      } else {
        res
          .status(400)
          .json({message: exc.message})
      }
    }
  } else {
    res
      .status(400)
      .json({message: 'Wrong parameter'})
  }
})

/** return a closure to initialize model */
module.exports = (model) => {
    alertsModel = model
    return router
  }