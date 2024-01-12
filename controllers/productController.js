const { getProductsFromMongo, getProductByIdFromMongo, createProduct } = require("../services/productService")

const getProducts = async (req,res)=> {
    const result = await getProductsFromMongo()
    console.log(req.session.user)

    res.status(200).render('home',{products: result})
}

const getProductById = async (req,res) =>{
    const {pid} = req.params
    const result = await getProductByIdFromMongo(pid)
    res.status(200).render('detail', {product: result})
    if(result){
        res.status(200).render('detail', {product: result, isAdmin: req.session.role == 'admin'})
    }
    else{
        res.status(404).render('errorView', {error: 'Product not found 404' })
    }
}

/* const updateProductoById = async (req,res) => {
    console.log(req.body)

    const {title, description, price, stock, id} = req.body
    const newProduct = {title, description, price, stock} 

    try{
        const result = await updateProductoById(id,newProduct)
        if(result){
            res.status(200).render('detail', newProduct)
        }
        else{
            res.status(404).render('errorView', {error: 'Product not Found :('})
        }
    }
    catch (error){
        console.error('Error al actualizar el producto:', error)
        res.status(500).render('errorView', {error: 'Internal server error'})
    }
};
 */
const updateProductById = async (req, res) => {
    console.log(req.body);
    
    const { title, description, price, stock, id } = req.body;
    const updatedProduct = { title, description, price, stock };

    try {
        const result = await updateProductByIdFromMongo(id, updatedProduct);

        if (result) {
            res.status(200).render('detail', { product: result });
        } 
        else {
            res.status(404).render('errorView', {error: 'Product not Found :('})
        }
        }
    catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).render('errorView', {error: 'Internal server error'})
    }
};


const editRequest = async (req, res) => {
    const {pid} = req.query
    console.log('me consultaron para editar el producto con id:' + pid)
    const result = await getProductByIdFromMongo(pid)
    if(result){
        res.status(200).render('detail', {product: result, editMode: true})
    }
    else{
        res.status(404).render('errorView', {error: 'Product not found 404' })
    }
}

const createNewProductRequest = async (req, res) =>{
    res.status(200).render('newProduct')
}

const createNewProduct = async(req,res) =>{
try{
    const {title, description, price, stock} = req.body
    if(!title || !description || !price || !stock){
        res.status(400).json({error: 'Todos los campos son obligatorios'})
    }
    const result = await createProduct({title, price, description, stock})

    return res.status(201).render('newProduct', { message: 'Producto creado exitosamente'});
}
catch(error){
    console.error('Error al crear el producto',error)
    return res.status(500).render('errorView', {error: 'Error del servidor'})
}
}

module.exports = {getProducts, getProductById, updateProductById, editRequest, createNewProduct ,createNewProductRequest}