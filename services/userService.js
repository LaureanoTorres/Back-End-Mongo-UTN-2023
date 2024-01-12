const { application } = require('express')
const User = require('../models/userModel')

const isExistentUser = async (userEmail) =>{
    const userExists = await User.findOne({email: userEmail}) //findOne ahora devuelve un objeto
    return Boolean(userExists)
}

const createUser = async (user)=>{
    if(! (await isExistentUser(user.email))){
        const newUser = new User(user)
        return {ok: true, user: await newUser.save()}
    }
    else{
        console.log('usuario ya registrado')
        return{ok: false, error: 'Usuario ya registrado'}
    }
    
}

/* const loginUser = async(user) =>{
    const userFound = await User.findOne({email: user.email})
    if(userFound){
        const passwordCorrect = userFound.password === user.password
        if(passwordCorrect){
            return {ok: true, user: user}
        }
        else{
            return {ok: false, error: 'Contraseña incorrecta'}
        }
    }
    else{
        return {ok: false, error: 'No existe el usuario'}
    }
} */

const loginUser = async (userEmail, password) => {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        return { ok: false, error: "No existe el usuario" };
    }
    const isPasswordCorrect = user.password === password;
    if (isPasswordCorrect) {
        return { ok: true, user: user };
    } else {
        return { ok: false, error: "Contraseña incorrecta" };
    }
};


/* createUser(
    {
    name: 'Pepecito',
    lastName: 'Gimenez',
    age: 23,
    email: 'pepecitogimenez@gmail.com',
    password: 'pepe1234'
}) */




module.exports = {createUser, isExistentUser, loginUser}
