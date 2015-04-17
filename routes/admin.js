var express = require('express');
var router = express.Router();
var dbService = null;
var passport = null;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transport = null;

router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.post('/login', function(req, res) {
  // Below is a custom callback like in the passport authenticate documentation
  // (this gist was useful too: https://gist.github.com/cultofmetatron/5349630).
  passport.authenticate('local', function(err, user) {
    if (err) return res.send({error: err.message});
    if (!user) return res.send({error: 'Invalid username or password.'});
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

router.post('/reset', function(req, res) {
  if (!req.body.email) {
    return res.send({error: 'Please provide your email address.'});
  }
  dbService.resetToken(req.body.email, function(err, token) {
    if (err) return res.send({error: err});
    var mailOptions = {
      from: 'No Reply <no-reply@familyjohansen.com>',
      to: req.body.email,
      subject: 'Password Reset - Family Johansen Blog',
      text: 'Hi,\n\n' +
            'If you need to reset your password for the Family Johansen blog, click this link within 2 days:\n\n' +
            'http://www.familyjohansen.com/admin/reset/'+token+'\n\n' +
            'Otherwise, just delete this email.\n\n' +
            'Warm regards,\n' +
            'Family Johansen Admin'
    };
    transport.sendMail(mailOptions, function(err, info){
      if (err) return res.send({error: err});
      return res.send({success: true});
    });
  });
});

router.get('/reset/:token', function(req, res) {
  // TODO .... Get the token from req.params.token and, if it's valid in the db, render the new password page
});

router.get('/test', ensureAuthenticated, function(req, res) {
  // For testing auth...
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/admin');
}

module.exports = function(databaseService, injectedPassport, emailConfig) {
  dbService = databaseService;
  passport = injectedPassport;
  transport = nodemailer.createTransport(smtpTransport({
    host: 'box428.bluehost.com',
    port: 465,
    secure: true,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password
    }
  }));
  return router;
};
