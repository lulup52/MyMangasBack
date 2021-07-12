const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET all tomes ----- */

router.get("/",(req, res) =>{
    connection.query('SELECT * from tome', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des tomes');
      } else {
        res.status(200).json(results);
      }
    });
});
/* ----- GET tome by id ----- */

router.get("/:id", (req, res) => {
    connection.query(
      "SELECT * from tome WHERE id=?",
      [req.params.id],
      (err, results) => {
        if (err) {  
            console.log(err);
            res.status(500).send("Erreur serveur");
         } else {
              if (results.length === 0) {
                  res.status(404).send("contenu introuvable");
              } else {
                  res.status(200).json(results);
              }
         }
      });
  });


module.exports = router;
