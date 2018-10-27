import notificationRepository from 'src/repository/NotificationRepository.mjs'

class GetMyNotifications {
    async execute(notificationData) {
        try {
            const notifications = await notificationRepository.getMyNotifications(notificationData.group, notificationData.to._id)
            this.emit("receiveMyNotifications",notifications)
        } catch (err) {
            this.emit("err",err)
        }
    }
}

export default new GetMyNotifications()
