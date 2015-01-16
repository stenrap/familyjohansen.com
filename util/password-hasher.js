var bcrypt = require('bcrypt');

bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash('', salt, function(err, hash) {
    // pass   ^
    console.log('The hash is " '+hash+' " my friend.');
  });
});