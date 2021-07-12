const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET all collections ----- */

router.get("/",(req, res) =>{
    connection.query('SELECT * from collection', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des collections');
      } else {
        res.status(200).json(results);
      }
    });
});
/* ----- GET all series in collection by user id ----- */

router.get("/serie_collection", (req, res) => {
    user_id =  req.body.user_id
    connection.query(
      " select user_id,serie_title, nbr_of_tome, serie.ilustration from collection JOIN tome ON collection.tome_id=tome.id JOIN serie on serie_id=serie.id  WHERE user_id=? GROUP BY serie_title;",
      [user_id],
      (err, results) => {
        if (err) {  
            console.log(err);
            res.status(500).send("Erreur serveur");
         } else {
              if (results.length === 0) {
                  res.status(404).send("série introuvable");
              } else {
                  res.status(200).json(results);
              }
         }
      });
  });
/* ----- GET all tomes by collection and user id ----- */

router.get("/tome_collection", (req, res) => {
    user_id =  req.body.user_id
    serie_id =  req.body.serie_id
    console.log(req)
    connection.query(
      "select user_id, title, subtitle, num_tome, tome.ilustration from collection join tome ON collection.tome_id=tome.id JOIN serie ON tome.serie_id=serie.id where user_id=? AND tome.serie_id=?;",
      [user_id, serie_id],
    
      (err, results) => {
        if (err) {  
            console.log(err);
            res.status(500).send("Erreur serveur");
         } else {
              if (results.length === 0) {
                  res.status(404).send("série introuvable");
              } else {
                  res.status(200).json(results);
              }
         }
      });
  });


module.exports = router;
