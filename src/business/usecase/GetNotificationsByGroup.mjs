import notificationRepository from 'src/repository/NotificationRepository.mjs'

class GetNotificationsByGroup {
    async execute(notificationData, responder) {
        try {
            const notifications = await notificationRepository.getNotificationsByGroup(notificationData.group)
            this.emit('receiveGroupNotifications', notifications)
        } catch (err) {
            this.emit('err', err)
        }
    }
}

export default new GetNotificationsByGroup()
