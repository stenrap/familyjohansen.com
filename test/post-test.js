var expect = require('chai').expect;

describe('The db service', function() {

  var dbConfig = require('config').get('db.config');
  var dbService = require('../services/db-service').init(dbConfig);
  var postId = 0;
  after(dbService.shutDown);

  it('should normalize post titles', function() {
    var titleWithSpace = dbService.normalizeTitle('Our Story')
    expect(titleWithSpace).to.equal('our-story');
    var titleWithApostrophe = dbService.normalizeTitle('Bridget\'s Challenge');
    expect(titleWithApostrophe).to.equal('bridgets-challenge');
  });
  
  it('should support creating posts', function(done) {
    dbService.createPost('/images/family.jpg',
                         false,
                         'Our Story',
                         'our-story',
                         '2015-01-22',
                         1,
                         'infertility, miracle, in vitro',
                         '',
                         function(id) {
                           postId = id;
                           expect(postId).to.be.above(0);
                           done();
                         });
  });
  
  // WYLO .... Now that you have a post, add a test for getSinglePost()
  
  // WYLO .... Since you have the post id, add a test for updatePost()

});
