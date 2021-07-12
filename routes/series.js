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

module.exports = router;
