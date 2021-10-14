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
/* ----- GET user if mdp and username match ----- */

router.post("/login",(req, res) =>{
  console.log(req.body)
    userName = req.body.username
    passWord = req.body.mdp
    connection.query('SELECT * from user WHERE user_name=? AND pass=?',[userName,passWord], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des lectures');
      } else {
        if(results.length === 0) {
          res.status(200).json(`données saisies éronnées`);

        } else {

          res.status(200).json(`${userName} is loged in with the id ${results[0].id}`);
        }

      }
    });
});


module.exports = router;
