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

module.exports = router;
