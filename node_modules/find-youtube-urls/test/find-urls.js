"use strict";

var findYoutubeUrls = require("../index.js");
var chai = require("chai");
chai.should();

describe('Find urls', function() {

  it('Should return one url', function() {
    var urls = findYoutubeUrls("https://www.youtube.com/watch?v=gK87eRlyk7U");
    urls.should.have.length(1);
  });

  it('Should return two urls', function() {
    var urls = findYoutubeUrls("https://www.youtube.com/watch?v=gK87eRlyk7U not-url https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    urls.should.have.length(2);
  });

});