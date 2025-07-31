
const mongoose = require('mongoose');



const riddlesSchema = mongoose.Schema({
  riddle: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});


const Riddle = mongoose.model('Riddle', riddlesSchema);
module.exports = Riddle;
//create a model, created variable and named it
