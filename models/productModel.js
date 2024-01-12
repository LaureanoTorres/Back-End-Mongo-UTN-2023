const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
})


const Product = mongoose.model('product', productSchema)

//usamos el new para cuando queremos instanciar un nuevo producto
const producto1 = new Product(
    {
        title: 'tv',
        description: 'Una tv de muy alta definicion',
        price: 900,
        stock: 40,
    }
)

//se usa el metodo save() para guardar el producto
/* producto1.save() */



module.exports = Product