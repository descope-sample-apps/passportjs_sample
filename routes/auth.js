var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');


passport.use(new LocalStrategy((username, password, cb) => {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});


var router = express.Router();

router.post('/login/password', passport.authenticate('local'), (req, res, next) => {
  var user = {
    id: req.user.id
  };
  if (req.user.name) { user.name = req.user.name; }
  if (req.user.username) { user.username = req.user.username; }
  res.json({ user });
});

router.post('/logout', passport.authenticate('session'), (req, res, next) => {
  req.logout();
  res.end();
});

router.post('/signup', passport.initialize(), (req, res, next) => {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
    if (err) { return next(err); }
    db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      req.body.username,
      hashedPassword,
      salt
    ], function(err) {
      if (err) { return next(err); }
      var user = {
        id: this.lastID,
        username: req.body.username
      };
      req.login(user, (err) => {
        if (err) { return next(err); }
        res.json({ user });
      });
    });
  });
});

router.get('/session', passport.authenticate('session'), (req, res, next) => {
  if (!req.user) {
    res.status(403).end();
    return;
  }
  
  
  var user = {
    id: req.user.id
  };
  if (req.user.name) { user.name = req.user.name; }
  if (req.user.username) { user.username = req.user.username; }
  
  console.log('session user is');
  console.log(req.user)
  console.log(user);
  console.log(req.session)
  
  res.json({ user });
});

module.exports = router;
