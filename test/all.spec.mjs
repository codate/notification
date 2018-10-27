import app from 'src/index.mjs'
import mongoose from 'mongoose'
import Server from 'src/common/Server.mjs'
import logger from 'src/common/logger.mjs'
import request from 'supertest';

describe('Integration tests', () => {
    let personInDatabase = {
        name: 'Fulano de Tal',
        email: 'fulano@gmail.com',
        docNumber: '12345678900',
        phoneNumber: '67981519401',
        address: {
            zip: '79033400',
            street: 'Rua Pirajussara',
            number: '172',
            district: 'Vila Carolina',
            city: 'Campo Grande',
            state: 'MS'
        }
    }

    before((done) => {
        new Server(app).start()
            .then(() => {
                const db = mongoose.connection
                db.collection('people').insert(personInDatabase).then((created) => {
                    logger.info('Inserting pre-data in database ')
                    personInDatabase = created.ops[0]
                    done()
                })
            })
            .catch(err => {
                logger.error('Error on starting server %s', err)
                done()
            })
    })

    describe('CreatePerson', () => {
        it('should register a new person when required data has informed', (done) => {
            const person = {
                name: 'Charles Viegas',
                email: 'charlesviegas@gmail.com',
                docNumber: '777700000077',
                phoneNumber: '67981519401',
                address: {
                    zip: '79033400',
                    street: 'Rua Pirajussara',
                    number: '172',
                    district: 'Vila Carolina',
                    city: 'Campo Grande',
                    state: 'MS'
                }
            }

            request(app)
                .post('/people')
                .send(person)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body).to.have.property('_id')
                    expect(res.body.email).to.equal(person.email)
                    done()
                })
        })

        it('should send status 400 when required data has not informed', (done) => {
            const person = {
                name: 'Charles Viegas',
                email: 'bla@gmail.com'
            }
            request(app)
                .post('/people')
                .send(person)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    done()
                })
        })
    })

    describe('UpdatePerson', () => {
        it('should update a person when required data has informed', (done) => {
            personInDatabase.name = 'Ciclano'
            personInDatabase.email = 'ciclano@gmail.com'

            request(app)
                .put('/people')
                .send(personInDatabase)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    done()
                })
        })
    })
})
