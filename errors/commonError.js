

class CommonAPIError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, status) => {
    return new CommonAPIError(msg, status)
}

module.exports = {CommonAPIError , createCustomError}