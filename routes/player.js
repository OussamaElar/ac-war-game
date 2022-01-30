const express = require('express');
const router = express.Router();
const Player = require('../model/player');

router.get('/', (req, res) => {
      Player.find()
            .sort({ date: -1 })
            .then(players => res.json(players))
            .catch(err => res.status(400).json({players: 'Players not found'}))
})

router.get('/game', (req, res) => {
      Player.find(req.query, (err, player) => {
            if (err) {
                  return res.status(404).json({player: 'Player not found'})
            } else {

                  return res.json(player)
            }
      })
            
   
})


router.post('/create', (req, res) => {

      Player.findOne({ name: req.body.name })
            .then((player) => {
                  if (player) {
                        return res.status(400).json({player: 'Player already exists'})
                  } else {
                        const newPlayer = new Player({
                        name: req.body.name,
                        score: req.body.score
                        })
                        newPlayer.save()
                              .then(player => res.json(player))
                              .catch(err => console.log(err))
            
                  }
            })
            
            
})

router.patch('/update/:id', (req, res) => {
      Player.findOne({ _id: req.body.id }, (err, player) => {
            if (err) {
                  return res.status(400).json(err)
            } else {
                  player.updateOne({ score: req.body.score }, (err, docs) => {
                        if (err) {
                              return res.status(400).json(err)
                        }
                        else {
                              return res.json({ score: 'score updated'})
                        }
                  })
            }
            
      }) 
      
            
})

module.exports = router;


