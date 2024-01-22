require('dotenv').config()
const DBConnector = require('./db/connect')

const productModel = require('./models/productModel')

const productsList = require('./products.json')


const startServer = async () => {
    try {
        await DBConnector(process.env.MONGO_URI)
        await productModel.deleteMany()
        await productModel.create(productsList)
        console.log("Success !!!")
        process.exit(0)
    } catch (error) {
        console.log("Error: ", error)
        process.exit(1)
    }
}
startServer()