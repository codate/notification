import notificationRepository from 'src/repository/NotificationRepository.mjs'

class ReadNotification {
    async execute(notificationData) {
        try {
            const readNotification = await notificationRepository.readNotification(notificationData._id)
            this.emit("readNotification",readNotification)
        } catch (err) {
            this.emit("err",err)
        }
    }
}

export default new ReadNotification()
