var express = require('express');
var router = express.Router();
var dbService = null;

router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.post('/', function(req, res) {

});

module.exports = function(databaseService) {
  dbService = databaseService;
  return router;
};
