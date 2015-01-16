var mysql = require('mysql2');
var pool = null;

module.exports = {

  init: function(dbConfig) {
    pool = mysql.createPool({
      connectionLimit: dbConfig.get('connectionLimit'),
      database: 'family_johansen',
      debug: true,
      host: dbConfig.get('host'),
      password: dbConfig.get('password'),
      port: dbConfig.get('port'),
      user: dbConfig.get('user')
    });
    return this;
  },
  
  verifyUser: function(username, password, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL verifyUser(?,?)', [username, password], function(err, results) {
        if (err) throw err;
        connection.release();
        // TODO:
      });
    });
  },

  shutDown: function() {
    pool.end();
  }

};