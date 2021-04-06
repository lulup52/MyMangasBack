const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET join between a playlist and all movies linket to ----- */

// comande sql : 
// select name as playlistName, genre, title from movie_playlist inner join playlist on movie_playlist.playlist_id= playlist.id inner join movies on movie_playlist.movie_id=movies.id ;
// renvoi le nom de la playliste, le genre de film associé et le titre du filme

router.get('/:id',(req, res) =>{
    const sqlRequest = `select name, genre, title, director, duration, year, movie_id, playlist_id from movie_playlist inner join playlist on movie_playlist.playlist_id= playlist.id inner join movies on movie_playlist.movie_id=movies.id where`
    const playlistId = req.params.id
    connection.query(`${sqlRequest} movie_playlist.playlist_id=?;`, [playlistId] ,(err, results) => {
      if (err) {
        res.status(500).send('requette pas passée');
      } else {
        res.status(200).json(results);
      }
    });
});



/* ----- POST (création) movies_playlists ----- */

  router.post('/post', (req, res) => {
    const formData = req.body;
    if (formData.movie_id == null || formData.movie_id === '' || formData.playlist_id == null || formData.playlist_id === '') {
      res.status(400).send("champs manquant");
    } else {
      connection.query('INSERT INTO movie_playlist SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un film");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
  });

/* ----- PUT (update) movies_playlists ----- */

router.put('/:id/update', (req, res) => {
  
  });


/* ------------------------ DELETE movies_playlists ------------------*/

router.delete('/:id', (req, res) => {
    
  });

module.exports = router;
