const connection = require("./config");
const cors = require('cors');

const express = require('express') ;
const { request, response } = require('express');
const port = 8000 ;
const app = express() ;

/*---------------creation du token et autentification avec celui ci------------------*/

const { createToken } = require('../services/jwt');
const { authenticateWithJwt } = require('../services/jwt');


app.use(cors())
app.use(express.json());

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });

/*------------------------ import des routes -----------------------------*/

const tomes = require('../routes/tomes');
app.use('/api/tomes', tomes);

const collection = require('../routes/collection');
app.use('/api/collection', collection);

const series = require('../routes/series');
app.use('/api/series', series)

const lecture = require('../routes/lecture');
app.use('/api/lecture', lecture)

const users = require('../routes/users');
app.use('/api/users', users)

/*----------------------------- acceuil ------------------------------------*/
app.get("/", (request, response) => {
  response.send("Welcome to my mangas");
});

