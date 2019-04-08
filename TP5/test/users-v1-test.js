const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')


chai.should()
chai.use(chaiHttp)

describe('Users tests', () => {
  it('should login with JWT on /v1/auth/login POST', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({ login: 'pedro', password: '1234' })
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('json')
          res
            .body
            .should
            .have
            .property('access_token')
          res
            .body
            .should
            .have
            .property('expirity')
        done()
      })
  })
  it('should not login with JWT on /v1/auth/login POST with bad credentials', done => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({ login: 'pedro', password: '12345678' })
      .end((err, res) => {
        res
          .should
          .have
          .status(401)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('json')
          res
            .body
            .should
            .have
            .property('code')
          res
            .body
            .should
            .have
            .property('type')
          res
            .body
            .should
            .have
            .property('message')
        done()
      })
  })

  it('should check access of user on /v1/auth/verifyaccess GET', done => {
    chai
      .request(app)
      .get('/v1/auth/verifyaccess')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        done()
      })
  })
  it('should check access of user on /v1/auth/verifyaccess GET', done => {
    chai
      .request(app)
      .get('/v1/auth/verifyaccess')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(401)
        res.should.be.json
        done()
      })
  })

  it('should list ALL users on /v1/users GET', done => {
    chai
      .request(app)
      .get('/v1/users')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('array')
        done()
      })
  })
  it('Unauthorized on /v1/users GET', done => {
    chai
      .request(app)
      .get('/v1/users')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(401)
        res.should.be.json
        done()
      })
  })
  it('should list a SINGLE user on /v1/users/<id> GET', done => {
    chai
      .request(app)
      .get('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('object')
        res
          .body
          .should
          .have
          .property('id')
        res
          .body
          .id
          .should
          .equal('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        done()
      })
  })

  it('should list an UNKNOW user on /v1/users/<id> GET', done => {
    chai
      .request(app)
      .get('/v1/users/45745c60-unknow-2d42b21b1a3e')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        res.should.be.json
        done()
      })
  })

  it('should add a SINGLE user on /v1/users POST', done => {
    chai
      .request(app)
      .post('/v1/users')
      .set('Authorization', 'BIDULE')
      .send({ name: 'Robert', login: 'roro', age: 23, password: '1234' })
      .end((err, res) => {
        res
          .should
          .have
          .status(201)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('object')
        res
          .body
          .should
          .have
          .property('id')
        res
          .body
          .should
          .have
          .property('name')
        res
          .body
          .name
          .should
          .equal('Robert')
        res
          .body
          .should
          .have
          .property('age')
        res
          .body
          .age
          .should
          .equal(23)
        res
          .body
          .should
          .have
          .property('login')
        res
          .body
          .login
          .should
          .equal('roro')
        done()
      })
  })

  it('should add a INVALID user on /v1/users POST', done => {
    chai
      .request(app)
      .post('/v1/users')
      .set('Authorization', 'BIDULE')
      .send({ name: 'Robert', login: 'roro', age: 23, wrongparam: 'value' })
      .end((err, res) => {
        res
          .should
          .have
          .status(400)
        res.should.be.json
        done()
      })
  })

  it('should add an EMPTY user on /v1/users POST', done => {
    chai
      .request(app)
      .post('/v1/users')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(400)
        res.should.be.json
        done()
      })
  })

  it('should update a SINGLE user on /v1/users/<id> PATCH', done => {
    chai
      .request(app)
      .patch('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', 'BIDULE')
      .send({ name: 'Robertinio', password: '1234' })
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('object')
        res
          .body
          .should
          .have
          .property('id')
        res
          .body
          .id
          .should
          .equal('45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        res
          .body
          .name
          .should
          .equal('Robertinio')
        res
          .body
          .login
          .should
          .equal('pedro')
        done()
      })
  })

  it('should update a user with wrong parameters on /v1/users/<id> PATCH', done => {
    chai
      .request(app)
      .patch('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', 'BIDULE')
      .send({ wrongparam1: 'Robertinio' })
      .end((err, res) => {
        res
          .should
          .have
          .status(400)
        res.should.be.json
        done()
      })
  })

  it('should update a UNKNOW user on /v1/users/<id> PATCH', done => {
    chai
      .request(app)
      .patch('/v1/users/45745c60-unknow-2d42b21b1a3e')
      .set('Authorization', 'BIDULE')
      .send({ name: 'Robertinio' })
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        res.should.be.json
        done()
      })
  })

  it('should delete a SINGLE user on /v1/users/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        done()
      })
  })

  it('should delete a UNKNOWN user on /v1/users/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/users/45745c60-unknown-2d42b21b1a3e')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        done()
      })
  })

  it('should delete a NULL ID user on /v1/users/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/users/')
      .set('Authorization', 'BIDULE')
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
        done()
      })
  })
})
