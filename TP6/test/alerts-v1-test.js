const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')


chai.should()
chai.use(chaiHttp)

const jeton = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InBlZHJvIiwiaWF0IjoxNTU1OTYzMDI4LCJleHAiOjE1NTY1Njc4Mjh9.3h6DcqJJCCi4unw8tSlfwdE6xZlnHtm0OaTS1BH5mF0'

describe('Alerts tests', () => {
    it('should put alert on /v1/alerts POST', done => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + jeton)
            .send({
                type: "weather",
                label: "My alert for",
                status: "warning",
                from: "string",
                to: "string"
            })
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
                    .should
                    .have
                    .property('type')
                res
                    .body
                    .should
                    .have
                    .property('label')
                res
                    .body
                    .should
                    .have
                    .property('status')
                res
                    .body
                    .should
                    .have
                    .property('from')
                res
                    .body
                    .should
                    .have
                    .property('to')
                done()
            })
    })
    it('should have an unauthorized warning when trying to put an alert on /v1/alerts POST', done => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + jeton + 'gfqts')
            .send({
                type: "weather",
                label: "My alert for",
                status: "warning",
                from: "string",
                to: "string"
            })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(401)
                res.should.be.json
                done()
            })
    })
    it('should have an error when trying to put an invalid alert on /v1/alerts POST', done => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + jeton)
            .send({
                type: "weather",
                label: "My alert for",
                stats: "warning",
                from: "string",
                to: "string"
            })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(405)
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
    it('should get alerts on /v1/alerts/search GET', done => {
        chai
            .request(app)
            .GET('/v1/alerts/search' + '?status=warning')
            .set('Authorization', 'Bearer ' + jeton)
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
    it('should get alerts on /v1/alerts/search GET', done => {
        chai
            .request(app)
            .GET('/v1/alerts/search' + '?stats=warning')
            .set('Authorization', 'Bearer ' + jeton)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(400)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('array')
                done()
            })
    })
    it('should get alert on /v1/alerts/:id GET', done => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + jeton)
            .send({
                type: "weather",
                label: "test a get",
                status: "warning",
                from: "string",
                to: "string"
            })
            .end((err, res) => {
                id = res.body.id
                chai
                    .request(app)
                    .GET('/v1/alerts/' + id)
                    .set('Authorization', 'Bearer ' + jeton)
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
                            .should
                            .have
                            .property('type')
                        res
                            .body
                            .should
                            .have
                            .property('label')
                        res
                            .body
                            .should
                            .have
                            .property('status')
                        res
                            .body
                            .should
                            .have
                            .property('from')
                        res
                            .body
                            .should
                            .have
                            .property('to')
                        done()
                    })
                    done()
            })
    })
    it('should get alert on /v1/alerts/:id GET', done => {
        chai
            .request(app)
            .post('/v1/alerts/sdfgkfg')
            .set('Authorization', 'Bearer ' + jeton)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
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
    it('should get alert on /v1/alerts/:id GET', done => {
        chai
            .request(app)
            .post('/v1/alerts/{nul:sdfgkfg}')
            .set('Authorization', 'Bearer ' + jeton)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(400)
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
    it('should patch alert on /v1/alerts POST', done => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + jeton)
            .send({
                type: "weather",
                label: "test a put",
                status: "warning",
                from: "string",
                to: "string"
            })
            .end((err, res) => {
                id = res.body.id
                chai
                    .request(app)
                    .put('/v1/alerts/' + id)
                    .set('Authorization', 'Bearer ' + jeton)
                    .send({
                        type: "weather",
                        label: "test put modified",
                        status: "warning",
                        from: "string",
                        to: "string"
                    })
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
                            .should
                            .have
                            .property('type')
                        res
                            .body
                            .should
                            .have
                            .property('label')
                        res.label.should.equal('test put modified')
                        res
                            .body
                            .should
                            .have
                            .property('status')
                        res
                            .body
                            .should
                            .have
                            .property('from')
                        res
                            .body
                            .should
                            .have
                            .property('to')
                        done()
                    })
                    done()
            })
    })
    it('should patch alert on /v1/alerts POST', done => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + jeton)
            .send({
                type: "weather",
                label: "test a put",
                status: "warning",
                from: "string",
                to: "string"
            })
            .end((err, res) => {
                id = res.body.id
                chai
                    .request(app)
                    .put('/v1/alerts/' + id)
                    .set('Authorization', 'Bearer ' + jeton)
                    .send({
                        type: "weather",
                        label: "test put modified",
                        stats: "warning",
                        from: "string",
                        to: "string"
                    })
                    .end((err, res) => {
                        res
                            .should
                            .have
                            .status(405)
                        done()
                    })
                    done()
            })
    })
})
