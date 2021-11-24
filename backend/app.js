const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const helmet = require('helmet');
require('dotenv').config();

const publicationRoutes = require("./routes/publication");
const commentRoutes = require("./routes/comment");
const userRoutes = require('./routes/user');

mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/publications', publicationRoutes); 
app.use('/api/comments', commentRoutes); 
app.use('/api/auth', userRoutes);

module.exports = app;