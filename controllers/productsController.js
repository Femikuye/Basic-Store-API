
const {CommonAPIError} = require('../errors/commonError')
const productModel = require('../models/productModel')

const getAllProductsStatic = async (req, res) => {
    const search = "ab"
    const products = await productModel.find({
       price: {$lt: 30}
        
    }).sort('-name price').select("name price").limit(7)
    res.status(200).json({rows: products.length, products})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields , numberFilters} = req.query
    const queryObj = {}
    if(numberFilters){
        /**
         * Query Samples: ?numberFilters=price<40,rating>4.0
         * 
         */
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '=': '$eq',
            '<=': '$lte'
        }
        const regex = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numberFilters.replace(regex, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-")
            if(options.includes(field)){
                queryObj[field] = {[operator]: Number(value)}
            }
        })
    }
    if(featured){
        queryObj.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObj.company = company
    }
    if(name){
        queryObj.name = {$regex: name, $options: 'i'}
    }
    console.log(queryObj)
    let result = productModel.find(queryObj)
    if(sort){
        /**
         * Query Sample: sort?name, createdAt, e.t.c
         */
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        /**
         * Query Sample: fields? name, price, createdAt
         */ 
        const fieldList = fields.split(",").join(" ")
        result = result.select(fieldList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.limit(limit).skip(skip)
    const products = await result
    // throw new CommonAPIError("Testing Async Error", 404)
    res.status(200).json({total: products.length, products})
}

module.exports = {getAllProductsStatic , getAllProducts}