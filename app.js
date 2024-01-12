const express = require('express')
const dotenv = require('dotenv')
const hbs = require('hbs')
const session = require('express-session')
dotenv.config()


const Product = require('./models/productModel')
/* const userService = require('./services/userService') */
const {isExistentUser, createUser, loginUser} = require('./services/userService') 
const productService = require('./services/productService')

const app = express()

const dbConfig = require('./db/dbConfig')

const PORT = process.env.PORT || 4000

//Midelwares
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//configuracion de la sesion
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

//Configuraciones
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

const callProducts = async() =>{
    const productSelected = await productService.getProductByIdFromMongo('655d42ec0da11cf20c0bcb48')
   /*  console.log(productSelected) */
}
/* cambie el id a idfrommongo */

/* callProducts() */


app.get('/register', (req, res)=>{
    res.render('register', {fecha: new Date().toLocaleTimeString()})
})

app.get('/login', (req, res) => {
    res.render('login', {fecha: new Date().toLocaleTimeString()})
})

app.post('/register', async (req,res)=>{
    const {name, lastname, age, email, password} = req.body
    const newUser = {name, lastname, age, email, password}
    const result = await createUser(newUser)
    if(result.ok){
      /*   res.status(201).json({ok:true, message: 'usuario creado'}) */
        res.render('register')
    }
    else{
        res.render('register', {error: result.error})
    }
})

app.post('/login', async (req,res)=>{
    const{email, password} = req.body
    if(email == process.env.ADMIN_MAIL && password === process.env.ADMIN_PASSWORD){ /* verificamos que sea el admin */
        req.session.user = {
            name: 'ADMIN',
            lastname: 'ADMIN',
            age: 99,
            email: process.env.ADMIN_MAIL,
        }
        req.session.role = 'admin'
        res.redirect('/products')
    } 
    const result = await loginUser(email, password)
    console.log(result)
    if(result.ok){
        req.session.user = result.user
        req.session.role = 'user'
        res.redirect('/products')
    }
    else{
        res.render('login', {error: result.error})
    }
})

const productRouter = require('./router/productRouter')

app.use('/products', productRouter)



app.listen(PORT, () => {
    console.log('Su aplicacion se escucha en http://localhost:' + PORT)
})

