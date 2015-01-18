var mysql = require('mysql2');
var pool = null;
var bcrypt = require('bcrypt');

module.exports = {

  init: function(dbConfig) {
    pool = mysql.createPool({
      connectionLimit: dbConfig.get('connectionLimit'),
      database: 'family_johansen',
//      debug: true,
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
      connection.query('CALL getUser(?)', [username], function(err, results) {
        if (err) throw err;
        connection.release();
        if (results[0][0]) {
          var user = results[0][0];
          bcrypt.compare(password, user.password, function(err, result) {
            if (err) throw err;
            if (result) {
              delete user.password;
              callback(user);
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      });
    });
  },

  normalizeTitle: function(title) {
    var normalized = title.toLowerCase();
    normalized = normalized.trim();
    normalized = normalized.replace(/\s/, "-");
    // If it's not a letter, number, or dash, replace it with the empty string
    normalized = normalized.replace(/[^a-z0-9\-]/, "");
    return normalized;
  },

  createPost: function(featured, video, title, normed, postDate, author, tags, body, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL createPost(?,?,?,?,?,?,?,?)', [featured, video, title, normed, postDate, author, tags, body], function(err, results) {
        if (err) throw err;
        connection.release();
        callback(results[0][0].id);
      });
    });
  },

  shutDown: function() {
    pool.end();
  }

};