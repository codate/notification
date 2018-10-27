import logger from './logger.mjs'

export const validationErrorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        logger.error(err)
        const payload = {
            status: 400,
            message: err.message,
            errors: {}
        }
        return res.status(payload.status).json(payload)
    }
    next(err)
}

export const joiErrorHandler = (err, req, res, next) => {
    if (err.status === 400 && err.statusText === 'Bad Request') {
        logger.error(err)
        const payload = {
            status: err.status,
            message: err.statusText,
            errors: err.errors
        }
        return res.status(payload.status).json(payload)
    }
    next(err)
}

export const mongoErrorHandler = (err, req, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        logger.error(err)
        const payload = {
            status: 400,
            message: err.message,
            errors: {}
        }
        return res.status(payload.status).json(payload)
    }
    next(err)
}

export const defaultErrorHandler = (err, req, res, next) => {
    logger.error(err)
    const payload = {
        status: 500,
        message: err.message,
        errors: {}
    }
    return res.status(payload.status).json(payload)
}
