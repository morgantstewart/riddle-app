
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


//Router logic
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('riddles/index.ejs', {
            riddles: currentUser.riddles
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



//GET for /new
router.get('/new', async (req, res) => {
    res.render('riddles/new.ejs');
});


//POST for '/applications
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.riddles.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser.id}/riddles`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



// GET to /applications/:applicationId

router.get('/:riddleId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const riddle = currentUser.riddles.id(req.params.riddleId)

        res.render('riddles/show.ejs', {
            riddle: riddle,
        })

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



// controllers/applications.js

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
