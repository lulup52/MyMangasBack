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
/* ----- GET all tomes in collections by user id  ----- */

router.get("/tome_collection/:userid",(req, res) =>{
    let userId = req.params.userid
    connection.query('SELECT * from collection where user_id=?',[userId], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des collections');
      } else {
        res.status(200).json(results);
      }
    });
});
/* ----- GET all series in collection by user id ----- */

router.get("/serie_collection/:userid", (req, res) => {
  let userId =  req.params.userid
    connection.query(
      " select user_id,user_name , serie.id AS serieId,serie.serie_title, nbr_of_tome, serie.ilustration, author from collection JOIN tome ON collection.tome_id=tome.id JOIN serie on serie_id=serie.id JOIN user ON collection.user_id=user.id WHERE user_id=? GROUP BY serie_title;",
      [userId],
      (err, results) => {
        if (err) {  
            console.log(err);
            res.status(500).send("Erreur serveur");
         } else {
              if (results.length === 0) {
                  res.status(200).send([]);
              } else {
                  res.status(200).json(results);
              }
         }
      });
  });
/* ----- GET all tomes in a serie by collection and user id ----- */

router.get("/alltomes_collection/:userid/:serieid", (req, res) => {
  let userid =  req.params.userid
  let serieid =  req.params.serieid
    connection.query(
      "select user_id ,user_name,tome.id AS tomeId, serie.id AS seriId, serie.serie_title, subtitle, num_tome, tome.ilustration, tome_sumary from collection join tome ON collection.tome_id=tome.id JOIN serie ON tome.serie_id=serie.id JOIN user ON collection.user_id=user.id where user_id=? AND tome.serie_id=? ORDER BY num_tome;",
      [userid, serieid],
    
      (err, results) => {
        if (err) {  
          console.log(userid, serieid)
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

/* ----- Get all series not include in user colection----- */

router.get("/serie_notin_collection/:userid", (req, res) => {
  let userId =  req.params.userid
  connection.query(
    " select user_id,user_name , serie.id AS serieId,serie.serie_title, nbr_of_tome, serie.ilustration, author from collection JOIN tome ON collection.tome_id=tome.id JOIN serie on serie_id=serie.id JOIN user ON collection.user_id=user.id WHERE user_id=? GROUP BY serie_title;",
    [userId],
    (err, resultsToCheck) => {
      if (err) {  
          console.log(err);
          res.status(500).send("Erreur serveur");
       } else {
            if (resultsToCheck.length === 0) {
              connection.query(    
                " select * from serie", (err, result ) => {
                  console.log(result)
                  res.status(200).json(result);
                }
              )  

            } else {
                let serieToRemove = resultsToCheck.map(e => e.serieId)
                connection.query(    
                  " select * from serie where serie.id NOT IN (?) ",
                  [serieToRemove],
                  (err, result ) => {
                    console.log(result)
                    res.status(200).json(result);
                  }
                )
            }
       }
    });
});
/* ----- Get all tomes not include in user colection by series ----- */

router.get("/tome_notin_collection_by_serie/:userid/:serieid", (req, res) => {
  let userId =  req.params.userid
  let serieId =  req.params.serieid
  connection.query(
    //---we get all tomes in collection by serie
    "SELECT user_name, user.id as user_id, tome.serie_title, serie_id, subtitle,num_tome, tome.id FROM tome JOIN collection ON tome.id = collection.tome_id join user ON collection.user_id=user.id WHERE user.id = ? AND serie_id=?",
    [userId, serieId],
    (err, tomesToCheck) => {
      if (err) {  
          console.log(err);
          res.status(500).send("Erreur serveur");
       } else {
            if (tomesToCheck.length === 0) {
                res.status(404).send("série introuvable");
            } else {
              console.log(tomesToCheck)
                let idTomeToRemove = tomesToCheck.map(e => e.id)
                connection.query(    
                  "select tome.id as tomeId, serie.id as serie_id, serie.serie_title, tome.ilustration, subtitle, num_tome, tome_sumary from tome join serie on serie.id=tome.serie_id where serie.id = ? and tome.id NOT IN (?);",
                  [serieId, idTomeToRemove],
                  (error, result ) => {
                    if(error) {
                      console.log(err);
                       res.status(500).send("Erreur serveur")
                    }else {

                      if (result.length===0) {
                        res.status(200).json({fullCollection : "For this serie, you already have all tomes on your collection"});
                      } else {
                        res.status(200).json(result)
                      }
                    }

                    
               
                  }
                )
            }
       }
    });
});

/* ----- post a tome(id) in user's(id) colection----- */

router.post("/tome_collection_add/:userid/:tomeid", (req, res) => {
  let userId =  req.params.userid
  let tomeid =  req.params.tomeid

    connection.query(
      "INSERT INTO collection (tome_id, user_id) VALUES (?,?);",
      [tomeid, userId],
    
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

/*---------------------remove a tome from a collection-------------------------*/

router.delete("/delete/:userid/:tomeid",(req, res) =>{
  let userId =  req.params.userid
  let tomeid =  req.params.tomeid
  connection.query('SELECT * FROM collection WHERE user_id = ? AND tome_id=?', [userId ,tomeid], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des collections');
    } else {
      if(results.length === 0) {
        res.status(404).json("ce tome n'est pas présent dans cete collection");

      } else {
        
        connection.query(    
          "DELETE FROM collection WHERE user_id = ? AND tome_id=?",
          [userId, tomeid],
          (error, result ) => {
            if (err) {
              res.status(500).send('Erreur lors de la récupération des collections');
            } else {
              
              res.status(200).json("tome suprimé avec succès");
            }
        })
      }
    }
  });
});
module.exports = router;
