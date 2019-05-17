let mongoose = require('mongoose')
const statusValues = ['warning', 'threat', 'danger', 'risk']
let alertSchema = new mongoose.Schema({
    type: {type: String,
        enum: ['weather', 'sea', 'transport'],
        required: true
    },
    label: {type: String, required: true},
    status: {type: String, enum: statusValues, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true}
})

Alerts = mongoose.model('Alerts', alertSchema)

const add = (alert) => {
    let newAlert = new Alerts(alert)
    return newAlert.save()
}

const getFromSearch = (status) => {
    return Alerts.find({ status: {$in : status}})
}

const get = (id) => {
    return Alerts.findById(id)
}

const update = (id, newAlertProperties) => {
    return Alerts.findByIdAndUpdate(id, newAlertProperties, {new:true})
}

const remove = (id) => {
    return Alerts.findOneAndDelete({_id: id })
}

exports.add = add
exports.getFromSearch = getFromSearch
exports.get = get
exports.update = update
exports.remove = remove
exports.statusValues = statusValues