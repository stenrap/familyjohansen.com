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
    var post = {
      featured: '/images/family.jpg',
      video: false,
      title: 'Our Story',
      postDate: '2015-01-22',
      author: 1,
      tags: 'infertility, miracle, in vitro',
      body: 'Connor is our <em>precious</em> miracle.'
    };
    dbService.createPost(post, function(id) {
      postId = id;
      expect(postId).to.be.above(0);
      done();
    });
  });
  
  it('should support finding a post by title', function(done) {
    dbService.getSinglePost('our-story', function(post) {
      expect(post.title).to.equal('Our Story');
      expect(post.post_date.getFullYear()).to.equal(2015);
      done();
    });
  });

  it('should support getting posts by date', function(done) {
    dbService.getPostsByDate(0, function(posts) {
      expect(posts.length).to.be.above(0);
      done();
    });
  });

  it('should support getting posts by an author', function(done) {
    dbService.getPostsByAuthor(1, 0, function(posts) {
      expect(posts.length).to.be.above(0);
      done();
    });
  });

  it('should support getting posts by a tag', function(done) {
    dbService.getPostsByTag('miracle', 0, function(posts) {
      expect(posts.length).to.be.above(0);
      done();
    });
  });

  it('should support updating posts', function(done) {
    var post = {
      id: postId,
      featured: '/images/family.jpg',
      video: false,
      title: 'Our Story',
      postDate: '2015-01-22',
      author: 1,
      tags: 'infertility, miracle, in vitro',
      body: 'We love Connor; he is our <em>precious</em> miracle.'
    };
    dbService.updatePost(post, function(id) {
      expect(postId).to.equal(id);
      dbService.getSinglePost('our-story', function(post) {
        expect(post.body).to.equal('We love Connor; he is our <em>precious</em> miracle.');
        done();
      });
    });
  });
  
  // WYLO .... Add a test for deletePost()

});
