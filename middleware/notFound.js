const notFoundMiddleware = (req, res) => res.status(404).json({msg: "Path Not Found"})

module.exports = notFoundMiddleware