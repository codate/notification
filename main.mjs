import app from 'src/index.mjs'
import Server from 'src/common/Server.mjs'
import logger from 'src/common/logger.mjs'

const server = new Server(app)
server.start()
    .then(startedServer => logger.info('Server started'))
    .catch(err => logger.error('Error on starting server %s', err))
