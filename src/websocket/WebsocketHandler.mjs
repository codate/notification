import sendNotification from 'src/business/usecase/SendNotification.mjs'
import readNotification from 'src/business/usecase/ReadNotification.mjs'
import getMyNotifications from 'src/business/usecase/GetMyNotifications.mjs'
import getNotificationsByGroup from 'src/business/usecase/GetNotificationsByGroup.mjs'
import listenPersonUpdateEvent from 'src/business/usecase/ListenPersonUpdateEvent.mjs'

export default class WebsocketHandler {
    constructor(io) {
        this.io = io
    }

    init(){
        this.io.on('connection', this._onConnection)
        this.io.on('disconnect', this._onDisconnect)
    }

    _onConnection(socket) {
        socket.on('join', (person) => {
            socket.join(person._id)
        })

        socket.on('leave', (person) => {
            socket.leave(person._id)
        })

        socket.on('sendNotification', sendNotification.execute)
        socket.on('readNotification', readNotification.execute)
        socket.on('getMyNotifications', getMyNotifications.execute)
        socket.on('getNotificationsByGroup', getNotificationsByGroup.execute)
    }

    _onDisconnect(socket) {

    }
}
