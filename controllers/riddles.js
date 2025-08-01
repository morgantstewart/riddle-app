
const express = require('express');
const router = express.Router();
const app = express();

const User = require("../models/user.js")

//import the Riddle model:
const Riddle = require("../models/riddle.js")

//GET request to /riddles
router.get('/riddles', async (req, res) => {
  try {
    const populatedRiddles = await Riddle.find({}).populate('owner');
    console.log('Populated Riddles:', populatedRiddles);
    res.render('riddles/index.ejs', { riddles: populatedRiddles });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});







//Router logic

// controllers/riddles.js
router.get('/', async (req, res) => {
  try {
    const populatedRiddles = await Riddle.find({}).populate('owner');
    console.log('Populated Riddles:', populatedRiddles);
    res.render('riddles/index.ejs', { riddles: populatedRiddles });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});





//GET for riddles/new
router.get('/new', async (req, res) => {
  res.render('riddles/new.ejs');
});



//attempted new POST /riddles

app.post('/riddles', async (req, res) => {
  try {
    await Riddle.create(req.body);
    res.redirect('/riddles');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating riddle');
  }




});


//







// GET to /applications/:applicationId
//changed riddles/show to riddles/index.ejs
router.get('/:riddleId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const riddle = currentUser.riddles.id(req.params.riddleId)

    res.render('riddles/index.ejs', {
      riddle: riddle,
    })

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});







router.get('/:riddleId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const riddle = currentUser.riddles.id(req.params.riddleId);
    res.render('riddles/edit.ejs', {
      riddle: riddle,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


//

router.put('/:riddleId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const riddle = currentUser.riddles.id(req.params.riddleId);

    riddle.set(req.body);

    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/riddles/${req.params.riddleId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});








module.exports = router;


