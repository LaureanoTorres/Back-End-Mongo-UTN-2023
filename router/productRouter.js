const express = require ('express')
const { getProducts, getProductById, updateProductById, editRequest, createNewProduct ,createNewProductRequest } = require('../controllers/productController')
const isAuth = require('../middelweres/authMiddlewere')
const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.get('/new', isAuth, createNewProductRequest)
productRouter.post('/editRequest', isAuth, editRequest)
productRouter.post('new', isAuth, createNewProduct)

productRouter.get('/:pid', isAuth, getProductById)
productRouter.post('/:pid',isAuth, updateProductById)


module.exports = productRouter