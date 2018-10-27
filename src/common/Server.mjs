import mongoose from 'mongoose'
import logger from './logger.mjs'
import environment from './environment.mjs'
import socketIo from 'socket.io'
import ioMongoAdapter from 'socket.io-adapter-mongo'
import WebsocketHandler from 'src/websocket/WebsocketHandler.mjs'


export default class Server {
    constructor(app) {
        this.app = app
    }

    async start() {
        this.registerGlobalEvents()
        await this.connectDb()
        return this.startApp()
    }

    registerGlobalEvents() {
        process.on('unhandledRejection', (reason, p) => {
            throw reason
        })
        process.on('uncaughtException', (error) => {
            logger.error('Error not handled %s', error)
            process.exit(1)
        })
    }

    async connectDb() {
        mongoose.Promise = global.Promise
        const options = {
            autoIndex: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 3,
            bufferMaxEntries: 0
        }
        return mongoose.connect(environment.db.url, options)
    }

    startApp() {
        return new Promise((resolve, reject) => {
            try {
                const server = this.app.listen(environment.server.port, () => {
                    resolve(server)
                })
                this.io = socketIo(server)

                this.io.adapter(ioMongoAdapter(environment.db.url))
                const websocketHandler = new WebsocketHandler(this.io)
                websocketHandler.init()
            } catch (err) {
                reject(err)
            }
        })
    }
}
