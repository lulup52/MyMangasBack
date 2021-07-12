const connection = require("./config");
const cors = require('cors');

const express = require('express') ;
const { request, response } = require('express');
const port = 8000 ;
const app = express() ;




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

const collections = require('../routes/collections');
app.use('/api/collections', collections);

const series = require('../routes/series');
app.use('/api/series', series)

/*----------------------------- acceuil ------------------------------------*/
app.get("/", (request, response) => {
  response.send("Welcome to my mangas");
});

