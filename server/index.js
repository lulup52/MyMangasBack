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

const movies = require('../routes/movies');
app.use('/api/movies', movies);

const playlists = require('../routes/playlists');
app.use('/api/playlists', playlists);

const movie_playlist = require('../routes/movie_playlist');
app.use('/api/movie_playlist', movie_playlist);


/*----------------------------- acceuil ------------------------------------*/
app.get("/", (request, response) => {
  response.send("Welcome to movies list");
});

