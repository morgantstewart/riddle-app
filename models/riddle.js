//write riddle schema here
//go back to openhouse

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  riddle: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
});

