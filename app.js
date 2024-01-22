require('dotenv').config();
require('express-async-errors')
const express = require('express')
const DBConnector = require('./db/connect')

const productRouter = require('./routes/productsRoute')

const notFoundMiddleware = require('./middleware/notFound')
const errorHanderMiddleware = require('./middleware/errorHandler')



const app = express();
app.use(express.json())


app.use('/api/v1/products', productRouter)
app.get('/', (req, res) => {
    res.send('<h1>Welcome To Store API</h1>')
})

app.use(notFoundMiddleware)
app.use(errorHanderMiddleware)

const port = process.env.PORT || 5000

const startServer = async () => {
    try {
        await DBConnector(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Application running on port ${port}`)
        })
    } catch (error) {
        console.log("Server Error: ", error)
    }
}
startServer()