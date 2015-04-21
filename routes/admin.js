var express = require('express');
var router = express.Router();
var dbService = null;
var passport = null;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transport = null;

router.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    res.cookie('authenticated', true, {path: '/admin'});
  } else {
    // TODO .... Clear this cookie on logout.
    res.clearCookie('authenticated', {path: '/admin'});
  }
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
  var token = req.params.token
  dbService.verifyToken(token, function(err, valid) {
    if (!valid) {
      res.clearCookie('token', {path: '/admin'});
    } else {
      res.cookie('token', token, {path: '/admin'});
    }
    res.redirect('/admin#reset');
  });
});

router.put('/reset', function(req, res) {
  var password1 = req.body.password1;
  var password2 = req.body.password2;
  var token = req.body.token;
  if (!password1 || !password2 || !token || (password1 != password2)) {
    return res.send({error: 'There was an error resetting your password.'});
  }
  dbService.verifyToken(token, function(err, valid) {
    res.clearCookie('token', {path: '/admin'});
    if (!valid) {
      return res.send({error: 'There was an error resetting your password.'});
    }
    dbService.resetPassword(password1, token, function(err, success) {
      if (!success) {
        return res.send({error: 'There was an error resetting your password.'});
      }
      return res.send({success: true});
    });
  });
});

router.get('/posts', ensureAuthenticated, function(req, res) {
  var posts = [];
  // TODO .... Use the dbService to get the posts...
  return res.send({posts: posts});
});

router.get('/test', ensureAuthenticated, function(req, res) {
  // For testing auth...
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    if (req.xhr) {
      return res.status(302).send('login');
    } else {
      res.redirect('/admin#login');
    }
  }
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
