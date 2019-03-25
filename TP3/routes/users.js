var express = require('express')
const router = express.Router()

const uuidv1 = require('uuid/v1');

const users = [
        {
        id : '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e', 
        login: 'pedro', 
        name: 'Pedro Ramirez', 
        age: 35
    }
]

router.get('/', function (req, res, next) {
    res.json(JSON.stringify(users))
})
router.get('/:id', function (req, res, next) {
    let user = users.filter((item)=>  item.id===req.params.id)
    if(user.length===0){
        res.status(404).send("404 : User not found")
    } else {
        res.json(user)
    }
})
router.post('/', function (req, res, next) {
    const newUser = req.body
    //validateUser
    newUser.id = uuidv1()
    //push
    //send ok
})
router.patch('/:id', function (req, res, next) {
    //validateUser
    //remplacer l'ancien objet par le nouveau
})
router.delete('/:id', function (req, res, next) {
    //supprimer
})

function validateUser(user){

}

module.exports = router
