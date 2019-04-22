const uuidv1 = require('uuid/v1')
const tcomb = require('tcomb')

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const USER = tcomb.struct({
    id: tcomb.String,
    name: tcomb.String,
    login: tcomb.String,
    age: tcomb.Number,
    password: tcomb.String
}, {strict: true})

let myUser = {}
let myUsers = []

const users = [
    {
        id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        name: 'Pedro Ramirez',
        login: 'pedro',
        age: 44,
        password: bcrypt.hashSync('1234', salt)
    }, {
        id: '456897d-98a8-78d8-4565-2d42b21b1a3e',
        name: 'Jesse Jones',
        login: 'jesse',
        age: 48,
        password: bcrypt.hashSync('1234', salt)
    }, {
        id: '987sd88a-45q6-78d8-4565-2d42b21b1a3e',
        name: 'Rose Doolan',
        login: 'rose',
        age: 36,
        password: bcrypt.hashSync('1234', salt)
    }, {
        id: '654de540-877a-65e5-4565-2d42b21b1a3e',
        name: 'Sid Ketchum',
        login: 'sid',
        age: 56,
        password: bcrypt.hashSync('1234', salt)
    }
]

const get = (id) => {
    const usersFound = users.filter((user) => user.id === id)
    const user = usersFound.length >= 1
        ? usersFound[0]
        : undefined
    if(!user)
        return undefined
    let myUser = {...user}
    delete myUser.password
    return myUser
}

const getAll = () => {
    let myUsers = [...users]
    for(user in myUsers) delete user.password
    return myUsers
}

const add = (user) => {
    const newUser = {
        ...user,
        id: uuidv1()
    }
    newUser.password = bcrypt.hashSync(newUser.password, salt)
    if (validateUser(newUser)) {
        users.push(newUser)
    } else {
        throw new Error('user.not.valid')
    }
    let myUser = {...newUser}
    delete myUser.password
    return myUser
}

const update = (id, newUserProperties) => {
    const usersFound = users.filter((user) => user.id === id)

    if (usersFound.length === 1) {
        const oldUser = usersFound[0]

        const newUser = {
            ...oldUser,
            ...newUserProperties
        }
        if(newUserProperties.password)
            newUser.password = bcrypt.hashSync(newUser.password, salt)
        // Control data to patch
        if (validateUser(newUser)) {
            //patch
            let oldUser = {...newUser}
            delete oldUser.password
            return oldUser
        } else {
            throw new Error('user.not.valid')
        }
    } else {
        throw new Error('user.not.found')
    }
}

const remove = (id) => {
    const indexFound = users.findIndex((user) => user.id === id)
    if (indexFound > -1) {
        let oldUser = {...users[indexFound]}
        users.splice(indexFound, 1)
        delete oldUser.password
        return oldUser
    } else {
        throw new Error('user.not.found')
    }
}

function validateUser(user) {
    let result = false
    /* istanbul ignore else */
    if (user) {
        try {
            const tcombUser = USER(user)
            result = true
        } catch (exc) {
            result = false
        }
    }
    return result
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove
exports.salt = salt
exports.users = users