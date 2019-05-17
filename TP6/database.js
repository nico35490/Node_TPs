let mongoose = require('mongoose');

const connectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0-kixdp.mongodb.net/test?retryWrites=true'

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(connectionString)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}
module.exports = new Database()