const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET all movies ----- */

router.get('/',(req, res) =>{
    connection.query('SELECT * from movies', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des coffrets');
      } else {
        res.status(200).json(results);
      }
    });
});


/* GET movie by id */

router.get("/:id", (req, res) => {
    connection.query(
      "SELECT * from movies WHERE id=?",
      [req.params.id],
      (err, results) => {
        if (err) {  
          console.log(err);
          res.status(500).send("Error retrieving data");
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

/* ----- POST (création) movie ----- */

  router.post('/post', (req, res) => {
    const formData = req.body;
    if (formData.title == null || formData.title === '') {
      res.status(400).send("champs manquant");
    } else {
      connection.query('INSERT INTO movies SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un film");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
  });

/* ----- PUT (update) movie ----- */

router.put('/:id/update', (req, res) => {
    const formData = req.body;
    const idMovie = req.params.id
    if (formData.title == null || formData.title === '') {
      res.status(400).send("champs manquant");
    } else {
      connection.query('UPDATE movies SET ? WHERE id=?' , [formData, idMovie], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un film");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
  });


/* ------------------------ DELETE movie ------------------*/

router.delete('/:id', (req, res) => {
    const idMovie = req.params.id;
    connection.query('DELETE FROM movies WHERE id = ?', idMovie, err => {
      if (err) {
        res.status(500).send(`Erreur lors de la suppression d'une bouteille`);
      } else {
        res.status(200).send(`supression du film ${idMovie} effectuée`);
      }
    });
  });

module.exports = router;
