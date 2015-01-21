var express = require('express');
var router = express.Router();
var dbService = null;

router.get('/', function(req, res) {
  // WYLO .... Come up with a design and implement this bad boy. Note that your db-service and SQL do not yet support pagination!
  res.send({number:22});
});

router.post('/', function(req, res) {

});

module.exports = function(databaseService) {
  dbService = databaseService;
  return router;
};
