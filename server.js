const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const riddlesController = require('./controllers/riddles.js');


const port = process.env.PORT ? process.env.PORT : '3000';


const isSignedIn = require('./middleware/is-signed-in.js');



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Riddle = require("./models/riddle.js");
app.use(express.urlencoded({ extended: false }));


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));




// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});


// GET /riddles/new
app.get("/riddles/new", (req, res) => {
  res.render("riddles/new.ejs");
});



// POST /riddles
app.post("/riddles", async (req, res) => {
  console.log(req.body);
  res.redirect("/riddles/new");
});





app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
