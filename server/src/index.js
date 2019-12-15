const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;
require('./db');

app.set('json spaces', 1);

//Middlewares
app.use(express.urlencoded({extended: true }));
app.use(express.json());

//Routes
app.use(cors())
app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log("Server running on port " + PORT+'.');
});