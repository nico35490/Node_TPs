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
            .set('Authorization', 'Bearer '+jeton)
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
                done()
            })
    })
})
