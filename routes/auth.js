var express = require('express');
var passport = require('passport');
var DescopeStrategy = require('passport-descope');
var path = require('path');


passport.use(new DescopeStrategy({
  projectId: process.env.DESCOPE_PROJECT || 'P2NyeltBwxXl01AO1zxIRoqusres',
  verify: (jwtDetails, cb) => cb(null, {id: jwtDetails.token.sub})
}));

var router = express.Router();

// Serve frontend entry file, for a case that the user is redirected back from auth (like Google OAuth) service to login/signup page
router.get(['/login', '/signup'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

module.exports = router;
