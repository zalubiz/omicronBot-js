"use strict";

var findYoutubeUrls = require("../index.js");
var expect = require("chai").expect;

describe('Does not find urls', function() {

  it('Should return null', function() {
    var urls = findYoutubeUrls("No youtube url here");
    expect(urls).to.equal(null);
  });

  it('Should return null from invalid url', function() {
    var urls = findYoutubeUrls("https://www.not-youtube.com/watch?v=dQw4w9WgXcQ");
    expect(urls).to.equal(null);
  });

});