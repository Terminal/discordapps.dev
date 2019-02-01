"use strict";

function tweet(tweet) {
  var twitterIntentURL = "https://twitter.com/intent/tweet?";
  var text = encodeURIComponent(tweet);
  var url = "".concat(twitterIntentURL, "text=").concat(text, "&related=rohitkrops");
  window.open(url, "Share on Twitter", "height=500, width=600");
}

module.exports = tweet;