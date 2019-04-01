const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')
chai.use(chaiHttp)

let Users = require('../model/users');
var should = require('chai').should();


describe('Users tests', () => {
    beforeEach((done) => {
        Users.init()
        done();

    });
    it('should list ALL users on /v1/users GET', (done) => {
        chai.request(app)
            .get('/v1/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    })
    it('should add a SINGLE user on /v1/users POST', (done) => {
        let user = {
            id: "The Lord of the Rings",
            name: "J.R.R. Tolkien",
            age: 1954,
            login: "jr35"
        }
        chai.request(app)
            .post('/v1/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                Users.getAll().length.should.be.eql(2);
                done();
            });
    })
    it('should update a SINGLE user on /v1/users/<id> PATCH', (done) => {
        let user = {
            name: "J.R.R. Tolkien",
            age: 1954,
            login: "jr35"
        }
        chai.request(app)
            .patch('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                Users.getAll().length.should.be.eql(1);
                Users.getAll()[0].age.should.be.eql(1954);
                //console.log(Users.getAll())
                done();
            });
    })
    it('should delete a SINGLE user on /v1/users/<id> DELETE', (done) => {
        chai.request(app)
            .delete('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
            .end((err, res) => {
                res.should.have.status(200);
                Users.getAll().length.should.be.eql(0);
                done();
            });
    })
})