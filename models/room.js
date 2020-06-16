const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true
  },
  gameState: {
    type: String,
    default: 'lobby',
    required: true
  },
  gameCategory: String,
  roomPassword: String,
  roundTime: Number,
  players: [
    {
      name: String,
      points: Number,
      guessed: Boolean,
      role: {
        type: String,
        default: 'user'
      }
    }
  ],
  guessPhrase: String,
  drawing: {
    movesList: [
      {
        xStart: Number,
        xEnd: Number,
        yStart: Number,
        yEnd: Number,
        color: String,
        size: Number
      }
    ],
    moveCount: Number
  },
});

module.exports = mongoose.model('Room', roomSchema);
