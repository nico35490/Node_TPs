const express = require('express')
const router = express.Router()

let alertsModel = undefined

/* Control usermodel initialisation */
router.use((req, res, next) => {
  /* istanbul ignore if */
  if (!alertsModel) {
    res
      .status(500)
      .json({ message: 'model not initialised' })
  }
  next()
})

router.post('/', function (req, res, next) {
  const newAlert = req.body

  /* istanbul ignore else */
  if (newAlert) {
    alertsModel.add(newAlert).then(alert => {
      req
        .res
      .status(200)
      .json(alert)
    })

      .catch((err) => {
        res
          .status(405)
          .json({ code: 0, type: "error", message: err.message })
      })
  } else {
    res
      .status(405)
      .json({ message: 'Wrong parameters' })
  }
})

router.get('/search', function (req, res, next) {
  const status = req.query['status']

  /* istanbul ignore else */
  if (status) {
    const statusList = status.split(",")
    const error = statusList.reduce((error, current) => error || !(alertsModel.statusValues.includes(current)), false)
    if(error){
      res
      .status(400)
      .json({ message: 'Wrong parameters' })
    return
  }

    alertsModel.getFromSearch().then(alerts => {
      req
        .res
        .status(200)
        .send(alerts)
    })
      .catch((err) => {
        res
          .status(400)
          .json({ code: 0, type: "error", message: err.message })
      })
  } else {
    res
      .status(400)
      .json({ message: 'Wrong parameters' })
  }
})
router.get('/:id', function (req, res, next) {
  const id = req.params.id

  /* istanbul ignore else */
  if (id) {
    alertsModel.get(id).then(alertFound => {
      if (alertFound) {
        res.json(alertFound)
      } else {
        res
          .status(404)
          .json({ code: 0, type: "Alert not found", message: `Alert not found with id ${id}` })
      }
    })
      .catch((err) => {
        res
          .status(404)
          .json({ code: 0, type: "Alert not found", message: `Alert not found with id ${id}` })
      })

  } else {
    res
      .status(400)
      .json({ message: 'Wrong parameter' })
  }
})

router.put('/:id', function (req, res, next) {
  const id = req.params.id
  const newAlertProperties = req.body

  /* istanbul ignore else */
  if (id && newAlertProperties) {
    alertsModel.update(id, newAlertProperties).then(updated => {
      res
        .status(200)
        .json(updated)
    })

      .catch((err) => {
        res
          .status(405)
          .json({ code: 0, type: "error", message: err.message })
      })
  }
  else {
    res
      .status(405)
      .json({ message: 'Wrong parameters' })
  }
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id

  /* istanbul ignore else */
  if (id) {
      alertsModel.remove(id).then(() => {
        req
          .res
          .status(200)
          .end()
      })
      .catch ((err) =>{
        res
          .status(405)
          .json({ code: 0, type: "error", message: err.message })
      })
  } else {
    res
      .status(400)
      .json({ message: 'Wrong parameter' })
  }
})

/** return a closure to initialize model */
module.exports = (model) => {
  alertsModel = model
  return router
}