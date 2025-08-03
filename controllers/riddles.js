
const express = require('express');
const router = express.Router();
const app = express();

const User = require("../models/user.js")

const Riddle = require("../models/riddle.js")




router.get('/new', async (req, res) => {
  res.render('riddles/new.ejs');
});



router.get('/', async (req, res) => {
  try {
    const populatedRiddles = await Riddle.find({}).populate('owner');
    console.log('Populated Riddles:', populatedRiddles);
    res.render('riddles/index.ejs', {
      riddles: populatedRiddles,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/:riddleId', async (req, res) => {
  try {
    console.log('riddleId: ', req.params.riddleId);
    const riddle = await Riddle.findById(req.params.riddleId)
    const owner = await User.findById(riddle.owner)
    res.render('riddles/show.ejs', { riddle: riddle, owner: owner });
  } catch (error) {
    console.log(error);
    res.send(error)
  }
});


router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  await Riddle.create(req.body);
  res.redirect('/riddles');
});


router.post('/:riddleId/', async (req, res) => {
  res.redirect('/riddles');
});






router.get('/:riddleId/edit', async (req, res) => {
  try {
    const currentRiddle = await Riddle.findById(req.params.riddleId);
    res.render('riddles/edit.ejs', {
      riddle: currentRiddle,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.put('/:riddleId', async (req, res) => {
  try {
    const currentRiddle = await Riddle.findById(req.params.riddleId);
    if (currentRiddle.owner.equals(req.session.user._id)) {
      await currentRiddle.updateOne(req.body);
      res.redirect('/riddles');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.delete('/:riddleId', async (req, res) => {
  try {
    const riddle = await Riddle.findById(req.params.riddleId);
    if (riddle.owner.equals(req.session.user._id)) {
      await riddle.deleteOne();
      res.redirect('/riddles');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});





module.exports = router;