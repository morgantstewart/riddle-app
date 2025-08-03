
const express = require('express');
const router = express.Router();
const app = express();

const User = require("../models/user.js")

//import the Riddle model:
const Riddle = require("../models/riddle.js")



//Router logic
//create and read CRUD routes are completed.


//GET for riddles/new
router.get('/new', async (req, res) => {
  res.render('riddles/new.ejs');
});



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

//GET SHOW PAGE
// controllers/listings.js

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





// controllers/listings.js



router.delete('/:riddleId', async (req, res) => {
  try {
    const riddle = await Riddle.findById(req.params.listingId);
    if (req.body.owner = req.session.user._id) {
      await riddle.deleteOne();
      res.redirect('/riddles');
    } else {
      res.send("You don't have permission to do that, sorry.");
    }
  } catch (error) {
    res.redirect('/');
  }
});




// GET // EDIT Riddles

router.get('/:riddleId/edit', async (req, res) => {
  try {
    console.log('riddleId: ', req.params.riddleId);
    
    const currentRiddle = await Riddle.findById(req.params.riddleId);
    
    res.render('riddles/edit.ejs', {
      riddle: currentRiddle,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




//PUT for EDIT RIDDLES

router.put('/:riddleId', async (req, res) => {
  try {
    const currentRiddle = await Listing.findById(req.params.riddleId);
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