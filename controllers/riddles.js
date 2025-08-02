
const express = require('express');
const router = express.Router();
const app = express();

const User = require("../models/user.js")

//import the Riddle model:
const Riddle = require("../models/riddle.js")


//Router logic
//create and read CRUD routes are completed.
// GET request to controllers/riddles.js

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

//

//GET for riddles/new
router.get('/new', async (req, res) => {
  res.render('riddles/new.ejs');
});

//GET SHOW PAGE
// controllers/listings.js

router.get('/:riddleId', async (req, res) => {
  try {
    console.log('riddleId: ', req.params.riddleId);
    res.send(`Riddles show page`);
  } catch (error) {
    console.log(error);
    res.redirect('riddles/show.ejs');
  }
});


//added fom Openhouse Database Insertion
router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  await Riddle.create(req.body);
  res.redirect('/riddles');
});


//newest, create a POST route for /listings
router.post('/:riddleId/', async (req, res) => {
  res.redirect('/riddles');
});





// router.put('/:riddleId', async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.session.user._id);
//     const riddle = currentUser.riddles.id(req.params.riddleId);

//     riddle.set(req.body);

//     await currentUser.save();
//     res.redirect(
//       `/users/${currentUser._id}/riddles/${req.params.riddleId}`
//     );
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });

// controllers/riddles.js SHOW

// router.get('/:riddleId', async (req, res) => {
//   try {
//     console.log('riddleId: ', req.params.riddleId);
//     res.send(`Riddles show page`);
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });




// router.get('/:riddleId/edit', async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.session.user._id);
//     const riddle = currentUser.riddles.id(req.params.riddleId);
//     res.render('riddles/edit.ejs', {
//       riddle: riddle,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });



//newest added

// router.get('/', async (req, res) => {
//   try {
//     const populatedRiddles = await Riddle.find({}).populate('owner');
//     console.log('Populated Riddles:', populatedRiddles);
//        res.render('riddles/index.ejs', {
//       riddles: populatedRiddles,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });





module.exports = router;