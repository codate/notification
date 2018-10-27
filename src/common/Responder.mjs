export default class Responder {
    constructor(req, res, next) {
        this.req = req
        this.res = res
        this.next = next
    }

    success(data) {
        this.res.json(data)
    }

    error(err) {
        this.next(err)
    }

    notFound() {
        this.res.sendStatus(404)
    }

    unauthorized() {
        this.res.sendStatus(401)
    }
}
