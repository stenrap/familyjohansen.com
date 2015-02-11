var express = require('express');
var router = express.Router();
var dbService = null;
var passport = null;

router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.post('/login', function(req, res) {
  // Below is a custom callback like in the passport authenticate documentation
  // (this gist was useful too: https://gist.github.com/cultofmetatron/5349630).
  passport.authenticate('local', function(err, user) {
    if (err) return res.send({error: err.message});
    if (!user) return res.send({error: 'Invalid username or password.'})
    req.login(user, function(err) {
      if (err) return res.send({error: err})
      return res.send({
        user: {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email
        }
      });
    });
  })(req, res);
});

router.get('/test', ensureAuthenticated, function(req, res) {
  // For testing auth...
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/admin');
}

module.exports = function(databaseService, injectedPassport) {
  dbService = databaseService;
  passport = injectedPassport;
  return router;
};
