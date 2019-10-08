const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // para q consiga entender body em req
app.use(bodyParser.urlencoded({ extended: false})); // para ele entender quando eu passar parametros url

require('./controllers/authController')(app);

app.listen(3000);
