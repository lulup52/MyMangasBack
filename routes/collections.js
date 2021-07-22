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

router.get("/serie_collection/:userid", (req, res) => {
    userId =  req.params.userid
    connection.query(
      " select user_id,user_name , serie.id AS serieId,serie_title, nbr_of_tome, serie.ilustration, author from collection JOIN tome ON collection.tome_id=tome.id JOIN serie on serie_id=serie.id JOIN user ON collection.user_id=user.id WHERE user_id=? GROUP BY serie_title;",
      [userId],
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

router.get("/tome_collection/:userid/:serieid", (req, res) => {
  userid =  req.params.userid
  serieid =  req.params.serieid
    connection.query(
      "select user_id ,user_name,tome.id AS tomeId, serie.id AS seriId, title, subtitle, num_tome, tome.ilustration, tome_sumary from collection join tome ON collection.tome_id=tome.id JOIN serie ON tome.serie_id=serie.id JOIN user ON collection.user_id=user.id where user_id=? AND tome.serie_id=?;",
      [userid, serieid],
    
      (err, results) => {
        if (err) {  
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

/* ----- post a new tome in a serie for user's colection----- */

router.post("", (req, res) => {
    connection.query(
      "",
      [],
    
      (err, results) => {
        if (err) {  
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
