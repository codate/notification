import notificationRepository from 'src/repository/NotificationRepository.mjs'

class ListenPersonUpdateEvent {
    async execute(responder) {
        try {
            this.emit({})
        } catch (err) {
            this.emit(err)
        }
    }
}

export default new ListenPersonUpdateEvent()
