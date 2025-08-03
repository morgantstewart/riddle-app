const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');



const port = process.env.PORT ? process.env.PORT : '3000';

//added as per middleware instructions on OpenHouse:
const isSignedIn = require('./middleware/is-signed-in.js');
const authController = require('./controllers/auth.js');
const riddlesController = require('./controllers/riddles.js');


const passUserToView = require('./middleware/pass-user-to-view.js');

module.exports = passUserToView;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Riddle = require("./models/riddle.js");
app.use(express.urlencoded({ extended: false }));


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));







//GET /
app.get('/', async (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});
//that one can stay.^^


// app.get('/riddles', async (req, res) => {
//   const allRiddles = await Riddle.find({});
//   res.send('Welcome to the riddles index page!');
// ;})


//GET / NEW
app.get('/riddles/new', async (req, res) => {
  res.render('riddles/new.ejs', {
  });
});






app.use(passUserToView)
app.use('/auth', authController)
app.use(isSignedIn)
app.use('/riddles', riddlesController)
//pointing to riddles controller
//need to adjust routes so they are not sent to server.js





app.get("/riddles/:riddleId", async (req, res) => {
  const foundRiddle = await Riddle.findById(req.params.riddleId);
  res.render("riddle/show.ejs", { riddle: foundRiddle });
});



//NEW
// POST /riddles
app.post("/riddles", async (req, res) => {
  await Riddle.create(req.body);
  res.redirect("/riddles"); // redirect to index fruits
});


// put -- RIDDLES EDIT
app.put("/riddles/edit", async (req, res) => {
  const foundRiddle = await Riddle.findById(req.params.riddleId);
  res.render("riddle/edit.ejs", { riddle: foundRiddle });
});




app.delete("/fruits/:fruitId", async (req, res) => {
  await Riddle.findByIdAndDelete(req.params.riddleId);
  res.redirect("/riddles");
});





app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});



