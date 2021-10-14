const express = require('express');
const connection = require('../server/config');

const router = express.Router();



/* ----- GET all users ----- */

router.get("/",(req, res) =>{
    connection.query('SELECT * from user', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des lectures');
      } else {
        res.status(200).json(results);
      }
    });
});


module.exports = router;
