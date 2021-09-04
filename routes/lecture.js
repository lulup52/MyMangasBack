const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET all lecture ----- */

router.get("/",(req, res) =>{
    connection.query('SELECT * from lecture', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des lectures');
      } else {
        res.status(200).json(results);
      }
    });
});
/* ----- GET all lectures by user id  ----- */

router.get("/tome_lecture/:userid",(req, res) =>{
    let userId=req.params.userid
    connection.query('SELECT * from lecture where user_id=?',[userId], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des lectures');
      } else {
        res.status(200).json(results);
      }
    });
});

/* ----- GET all series in lectures by user id ----- */

router.get("/series_lecture/:userid", (req, res) => {
  userId =  req.params.userid
  connection.query(
    " select user_id,user_name , serie.id AS serieId,serie_title, nbr_of_tome, serie.ilustration, author from lecture JOIN tome ON lecture.tome_id=tome.id JOIN serie on serie_id=serie.id JOIN user ON lecture.user_id=user.id WHERE user_id=? GROUP BY serie_title;",
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

module.exports = router;
