import notificationRepository from 'src/repository/NotificationRepository.mjs'

class SendNotification {
    async execute(notificationData) {
        try {
            const createdNotification = await notificationRepository.create(notificationData)
            this.to(notificationData.to._id).emit('receiveNotification', createdNotification)
        } catch (err) {
            this.emit('err', err)
        }
    }
}

export default new SendNotification()
