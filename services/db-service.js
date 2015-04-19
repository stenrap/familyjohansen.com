var mysql = require('mysql2');
var pool = null;
var bcrypt = require('bcrypt');

module.exports = {

  init: function(dbConfig) {
    pool = mysql.createPool({
      connectionLimit: dbConfig.get('connectionLimit'),
      database: 'family_johansen',
      //debug: true,
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
        if (results && results[0] && results[0][0]) {
          var user = results[0][0];
          bcrypt.compare(password, user.password, function(err, result) {
            if (err) throw err;
            if (result) {
              delete user.password;
              callback(null, user);
            } else {
              callback(null, null);
            }
          });
        } else {
          callback('Internal error.', null);
        }
      });
    });
  },

  resetToken: function(email, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL resetToken(?)', [email], function(err, results) {
        if (err) throw err;
        connection.release();
        if (results && results[0] && results[0][0] && results[0][0].token) {
          var token = results[0][0].token;
          callback(null, token);
        } else {
          callback('No user with that email address.', null);
        }
      });
    });
  },

  verifyToken: function(token, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL verifyToken(?)', [token], function(err, results) {
        if (err) throw err;
        connection.release();
        if (results && results[0] && results[0][0] && results[0][0].valid) {
          var valid = results[0][0].valid == 1;
          callback(null, valid);
        } else {
          callback('Invalid token.', null);
        }
      });
    });
  },

  resetPassword: function(password, token, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) throw err;
          connection.query('CALL resetPassword(?,?)', [hash, token], function(err, results) {
            if (err) throw err;
            connection.release();
            if (results && results[0] && results[0][0] && results[0][0].success) {
              var success = results[0][0].success == 1;
              callback(null, success);
            } else {
              callback('Password reset failed.', null);
            }
          });
        });
      });
    });
  },

  getUserById: function(id, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL getUserById(?)', [id], function(err, results) {
        if (err) throw err;
        connection.release();
        if (results && results[0] && results[0][0]) {
          var user = results[0][0];
          delete user.password;
          callback(null, user);
        } else {
          callback('No user with that ID.', null);
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

  createPost: function(post, callback) {
    var service = this;
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      post.normed = service.normalizeTitle(post.title);
      var params = [post.featured, post.video, post.title, post.normed, post.postDate, post.author, post.tags, post.body];
      connection.query('CALL createPost(?,?,?,?,?,?,?,?)', params, function(err, results) {
        if (err) throw err;
        connection.release();
        callback(results[0][0].id);
      });
    });
  },

  getSinglePost: function(title, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL getSinglePost(?)', [title], function(err, results) {
        if (err) throw err;
        connection.release();
        callback(results[0][0]);
      });
    });
  },

  getPostsByDate: function(offset, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL getPostsByDate(?)', [offset], function(err, results) {
        if (err) throw err;
        connection.release();
        callback(results[0]);
      });
    });
  },

  getPostsByAuthor: function(authorId, offset, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL getPostsByAuthor(?,?)', [authorId, offset], function(err, results) {
        if (err) throw err;
        connection.release();
        callback(results[0]);
      });
    });
  },

  getPostsByTag: function(tag, offset, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL getPostsByTag(?,?)', [tag, offset], function(err, results) {
        if (err) throw err;
        connection.release();
        callback(results[0]);
      });
    });
  },
  
  updatePost: function(post, callback) {
    var service = this;
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      post.normed = service.normalizeTitle(post.title);
      var params = [post.id, post.featured, post.video, post.title, post.normed, post.postDate, post.author, post.tags, post.body];
      connection.query('CALL updatePost(?,?,?,?,?,?,?,?,?)', params, function(err, results) {
        if (err) throw err;
        connection.release();
        callback(results[0][0].id);
      });
    });
  },

  deletePost: function(id, callback) {
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('CALL deletePost(?)', [id], function(err, results) {
        if (err) throw err;
        connection.release();
        callback();
      });
    });
  },

  shutDown: function() {
    pool.end();
  }

};