var bcrypt = require('bcrypt');

bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash('', salt, function(err, hash) {
    // pass   ^   WYLO .... Decide on a password for the 'rob' user, then add him to the db and test verifyUser()
    console.log('The hash is " '+hash+' " my friend.');
  });
});