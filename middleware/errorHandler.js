const {CommonAPIError} = require('../errors/commonError')

const errorHandler = (error, req, res, next) => {
    if(error instanceof CommonAPIError){
        return res.status(error.statusCode).json({msg: error.message})
    }
    return res.status(500).json({msg: "An Error Occured"})
}

module.exports = errorHandler