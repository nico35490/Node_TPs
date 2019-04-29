let mongoose = require('mongoose')
let alertSchema = new mongoose.Schema({
        type: String,
        label: String,
        status: String,
        from: String,
        to: String
})

Alerts = mongoose.model('Alerts',alertSchema)

const add = (alert) => {
    const newAlert = new Alerts(alert)
    return newAlert.save()
    .then(doc => {console.log(doc)})
    .catch(err => {console.log(err)})
}

exports.add = add