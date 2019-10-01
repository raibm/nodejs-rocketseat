const express = require('express');
const User = require('../models/user');

//express framework usado para controlar rotas, retorna para o front end jsons, pegar parametros da req, bodys da req etc

const router = express.Router();

router.post('/register', async (req, res) => {
    
    const { email } = req.body;

    try {
        if (await User.findOne({email}))
            return res.status(400).send({ error: 'Email em uso.' }); 
         
            const user = await User.create(req.body);
            return res.send(user);


    }catch( err ){
        return res.status(400).send({ error: 'Registration failed' });
    }
});

module.exports = app => app.use('/auth', router); 