var express = require('express');
var passport = require('passport');
var DescopeStrategy = require('passport-descope');

passport.use(new DescopeStrategy({
  projectId: 'P2NyeltBwxXl01AO1zxIRoqusres',
  verify: (jwtDetails, cb) => cb(null, {id: jwtDetails.token.sub})
}));

var router = express.Router();

router.get('/login', (req, res, next) => {
  
})

module.exports = router;
