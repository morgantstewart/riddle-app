const mongoose = require('mongoose');



const RiddlesSchema = mongoose.Schema({
  riddle: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

