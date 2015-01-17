var expect = require('chai').expect;

describe('The db service', function() {

  var dbConfig = require('config').get('db.config');
  var dbService = require('../services/db-service').init(dbConfig);
  after(dbService.shutDown);

  it('should normalize post titles', function() {
    var titleWithSpace = dbService.normalizeTitle('Our Story')
    expect(titleWithSpace).to.equal('our-story');
    var titleWithApostrophe = dbService.normalizeTitle('Bridget\'s Challenge');
    expect(titleWithApostrophe).to.equal('bridgets-challenge');
  });
  
  // WYLO .... Uncomment the next test and get it working.
  
  /*
  it('should support creating posts', function(done) {
    dbService.createPost('/images/family.jpg',
                         false,
                         'Our Story', 
                         '2015-01-22',
                         1,
                         'infertility, miracle, in vitro',
                         '',
                         function(success) {
      expect(success).to.be.true;
      done();
    });
  });
  */
    
});
