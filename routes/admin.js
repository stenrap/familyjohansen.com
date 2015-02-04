var express = require('express');
var router = express.Router();
var dbService = null;

router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.post('/login', function(req, res) {
  // WYLO .... Try implementing the custom callback from the passport authenticate documentation (this gist might
  //           be useful too: https://gist.github.com/cultofmetatron/5349630). Hopefully this will allow you to
  //           stay with your Ajax approach.
});

router.get('/test', function(req, res) {
  // For testing auth...
});

module.exports = function(databaseService) {
  dbService = databaseService;
  return router;
};
