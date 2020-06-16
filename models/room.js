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
      points: {
        type: Number,
        default: 0
      },
      guessed: {
        type: Boolean,
        default: false,
      },
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
    ]
  },
});

module.exports = mongoose.model('Room', roomSchema);
