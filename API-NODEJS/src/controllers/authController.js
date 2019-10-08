const express = require('express');

const bcrypt = require('bcryptjs');

const jsonwebtoken = require('jsonwebtoken');

const meuToken = require('../config/auth.json');

const User = require('../models/user');
//express framework usado para controlar rotas, retorna para o front end jsons, pegar parametros da req, bodys da req etc

const router = express.Router();

function generateToken(params = {}){
  return jsonwebtoken.sign(params, meuToken.secret, {
        expiresIn: 86400
    })
}

router.post('/register', async (req, res) => {
    
    const { email } = req.body;

    try {
        if (await User.findOne({email}))
            return res.status(400).send({ error: 'Email em uso.' }); 
         
            const user = await User.create(req.body);
            
            user.password = undefined;

            return res.send({ user,  token: generateToken({ id: user.id }) });


    }catch( err ){
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
   
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
    return res.status(400).send({ error: 'User not found' });

    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    res.send({ user, token: generateToken({id: user.id}) });

});

module.exports = app => app.use('/auth', router); 