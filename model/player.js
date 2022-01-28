const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PlayerShema = new Schema({
      name: {
            type: String,
            required: true
      },
      score: {
            type: Number,
            required: true,
            default: 0
      }
      
}, {
      timestamp: true 
})

const Player = mongoose.model('Player', PlayerShema);
module.exports = Player;