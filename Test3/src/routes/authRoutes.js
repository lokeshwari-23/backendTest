
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');


router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser.save((err) => {
    if (err) {
      return res.status(500).json({ message: 'failed' });
    }
    res.status(200).json({ message: 'successful' });
  });
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
}));


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
