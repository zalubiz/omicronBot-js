# Get Youtube urls from string [![Build Status](https://travis-ci.org/JuhQ/find-youtube-urls.svg)](https://travis-ci.org/JuhQ/find-youtube-urls)

## To use

`npm install find-youtube-urls --save`


```
var findYoutubeUrls = require("./index.js");

var string = "https://www.youtube.com/watch?v=gK87eRlyk7U";

var youtubeUrls = findYoutubeUrls(string);
// youtubeUrls = ["https://www.youtube.com/watch?v=gK87eRlyk7U"];
```


## Development

`npm install`

`gulp watch-test`


## Test
`gulp test`
