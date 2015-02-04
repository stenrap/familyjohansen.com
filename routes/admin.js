var express = require('express');
var router = express.Router();
var dbService = null;

router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.post('/login', function(req, res) {
  // WYLO .... You currently have the client-side POSTing here via Ajax. What about passport's ability to redirect?
});

router.get('/test', function(req, res) {
  // For testing auth...
});

module.exports = function(databaseService) {
  dbService = databaseService;
  return router;
};
