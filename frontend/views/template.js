"use strict";

// html skeleton provider
function template(title) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var scripts = ''; // Dynamically ship scripts based on render type

  if (content) {
    scripts = "\n<script>\n  window.__STATE__ = ".concat(JSON.stringify(initialState), "\n</script>\n<script src=\"build/client.js\"></script>\n");
  } else {
    scripts = '<script src="build/bundle.js"></script>';
  }

  var page = "\n<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>".concat(title, "</title>\n  </head>\n  <body>\n    <div id=\"app\">\n      ").concat(content, "\n    </div>\n    ").concat(scripts, "\n  </body>\n</html>\n");
  return page;
}

module.exports = template;