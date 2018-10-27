import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
    content: {type: Object, required: true},
    from: {
        _id: {type: String, required: true},
        name: {type: String, required: true},
        photo: {type: String}
    },
    to:{
        _id: {type: String, required: true},
        name: {type: String, required: true},
        photo: {type: String}
    },
    group: {type: String, required: true},
    isRead: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export default mongoose.model('Notification', NotificationSchema)
