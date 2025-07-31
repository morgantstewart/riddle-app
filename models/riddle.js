const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const port = process.env.PORT ? process.env.PORT : '3000';


const RiddlesSchema = mongoose.Schema({
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

