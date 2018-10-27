import Notification from './Notification.mjs'

class NotificationRepository {
    async create(notificationData) {
        const created = await Notification.create(notificationData)
        return created
    }

    async update(notificationData) {
        const updated = await Notification.update(notificationData)
        return updated
    }

    async remove(id) {
        const removed = await Notification.deleteOne({_id: id})
        return removed
    }

    async getNotificationById(id) {
        const notification = await Notification.findOne({_id: id})
        return notification
    }

    async readNotification(notificationId){
        const updated = await Notification.findOneAndUpdate({
                _id: notificationId
            },
            {"$set": {"isRead":true}})
        return updated
    }

    async getMyNotifications(group, personId) {
        const notification = await Notification.find({"group": group, "to._id": personId})
        return notification
    }

    async getNotificationsByGroup(group) {
        const notification = await Notification.find({group: group})
        return notification
    }
}

export default new NotificationRepository()
