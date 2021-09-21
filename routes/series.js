const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET all series ----- */

router.get("/",(req, res) =>{
    connection.query('SELECT * from serie;', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des collections');
      } else {
        res.status(200).json(results);
      }
    });
});

/* ----- GET all tomes in a serie ----- */

router.get("/alltomes_serie/:serieid", (req, res) => {
  serieId =  req.params.serieid
    connection.query(
      "select tome.id AS tomeId, num_tome,serie_id, serie.serie_title, subtitle, tome_sumary FROM serie JOIN tome ON tome.serie_id=serie.id WHERE serie.id =?;",
      [serieId],
    
      (err, results) => {
        if (err) {  
            res.status(500).send("Erreur serveur");
         } else {
              if (results.length === 0) {
                  res.status(404).send("aucun tomes trouvés");
              } else {
                  res.status(200).json(results);
              }
         }
      });
  });

module.exports = router;
