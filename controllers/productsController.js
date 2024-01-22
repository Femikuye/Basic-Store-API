
const {CommonAPIError} = require('../errors/commonError')
const productModel = require('../models/productModel')

const getAllProductsStatic = async (req, res) => {
    const search = "ab"
    const products = await productModel.find({
       
        
    }).sort('-name price')
    res.status(200).json({rows: products.length, products})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query
    const queryObj = {}
    if(featured){
        queryObj.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObj.company = company
    }
    if(name){
        queryObj.name = {$regex: name, $options: 'i'}
    }
    let result = productModel.find(queryObj)
    if(sort){
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldList = fields.split(",").join(" ")
        result = result.select(fieldList)
    }
    const products = await result
    // throw new CommonAPIError("Testing Async Error", 404)
    res.status(200).json({total: products.length, products})
}

module.exports = {getAllProductsStatic , getAllProducts}