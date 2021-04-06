const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET all playlist ----- */

router.get('/',(req, res) =>{
  connection.query('SELECT * from playlist', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des playlistes');
    } else {
      res.status(200).json(results);
    }
  });
});


/* GET playlist by id */

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * from playlist WHERE id=?",
    [req.params.id],
    (err, results) => {
      if (err) {  
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        if (results.length === 0) {
          res.status(404).json("aucune playliste ne correspond");

        } else {

          res.status(200).json(results);
        }

      }
    }
  );
});

/* ----- POST (création) playlist ----- */

  router.post('/post', (req, res) => {
    const formData = req.body;
    if (formData.name == null || formData.name === '' || formData.genre == null || formData.genre === '') {
      res.status(400).send("champs manquant");
    } else {
      connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde de la playliste");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
  });

/* ----- PUT (update) playlist ----- */

router.put('/:id/update', (req, res) => {
  const formData = req.body;
  const idPlayliste = req.params.id

  connection.query(
    "SELECT * from playlist WHERE id=?", [idPlayliste], (err, results) => {
      if (err) {  
        console.log(err);
        res.status(500).send("erreur data inexistante");
      } else {
        if (results.length === 0) {
          res.status(404).send("la playliste n'existe pas");

        } else {
          if (formData.name == null || formData.name === '' || formData.genre == null || formData.genre === '') {
              res.status(400).send("champs manquant");
          } else  {
            connection.query('UPDATE playlist SET ? WHERE id=?' , [formData, idPlayliste], (err, results) => {
              if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la sauvegarde de la playliste");
              } else {
                
                res.status(201).send({...formData});
              }
            })
          }
        }
      }
    })
});


/* ------------------------ DELETE playlist ------------------*/

router.delete('/:id', (req, res) => {
  const idMovie = req.params.id;
  connection.query('DELETE FROM playlist WHERE id = ?', idMovie, err => {
    if (err) {
      res.status(500).send(`Erreur lors de la suppression de la playliste`);
    } else {
      res.status(200).send(`supression de la playliste ${idMovie} effectuée`);
    }
  });
});

module.exports = router;
