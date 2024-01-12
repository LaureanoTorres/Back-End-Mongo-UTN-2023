const Product = require("../models/productModel")


const getProductsFromMongo = async () => {
    return await Product.find({})
}
const getProductByIdFromMongo = async (pid) =>{
    try{
        const result = await Product.findOne({_id: pid})
        return result
    }
    catch(error){
        console.error(error)
        throw error
    }
    }
    

const updateProductoByIdFromMongo = async (pid, productoActualizado) => {
    try{
        const updatedProduct = await Product.findOneAndUpdate({id: pid}, productoActualizado, {new: true})
        return updatedProduct;
    }
    catch (error){
        console.error('Error al actualizar el producto', error)
        throw error;
    }
}


const createProduct = async (newProduct) => {
    const product = new Product (newProduct)
    return await product.save()
}

module.exports = {getProductsFromMongo, getProductByIdFromMongo, updateProductoByIdFromMongo, createProduct}

