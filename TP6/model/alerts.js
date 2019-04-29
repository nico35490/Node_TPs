let mongoose = require('mongoose')
const uuidv1 = require('uuid/v1');

let alertSchema = new mongoose.Schema({
    id: String,
    type: ['weather', 'sea', 'transport'],
    label: String,
    status: ['warning', 'threat', 'danger', 'risk'],
    from: String,
    to: String
},{ _id : false })

Alerts = mongoose.model('Alerts', alertSchema)

const add = (alert) => {
    alert.id = uuidv1()
    let newAlert = new Alerts(alert)
    return newAlert.save()
        .then(doc => { console.log(doc) })
        .catch(err => { console.log(err) })
}

const getFromSearch = (status) => {
    return Alerts.findOne({ status: status })
        .then(doc => { console.log(doc) })
        .catch(err => { console.log(err) })
}

const get = (id) => {
    return Alerts.findById(id)
        .then(doc => { console.log(doc) })
        .catch(err => { console.log(err) })
}

const update = (id, newAlertProperties) => {
    return Alerts.findByIdAndUpdate(id, newAlertProperties)
        .then(doc => { console.log(doc) })
        .catch(err => { console.log(err) })
}

const remove = (id) => {
    return Alerts.findOneAndDelete({id: id })
        .then(doc => { console.log(doc) })
        .catch(err => { console.log(err) })
}

exports.add = add
exports.getFromSearch = getFromSearch
exports.get = get
exports.update = update
exports.remove = remove