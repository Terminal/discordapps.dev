"use strict";

// html skeleton provider
function template(title) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var scripts = ''; // Dynamically ship scripts based on render type

  if (content) {
    scripts = " <script>\n                   window.__STATE__ = ".concat(JSON.stringify(initialState), "\n                </script>\n                <script src=\"assets/client.js\"></script>\n                ");
  } else {
    scripts = ' <script src="assets/bundle.js"> </script> ';
  }

  var page = "<!DOCTYPE html>\n              <html lang=\"en\">\n              <head>\n                <meta charset=\"utf-8\">\n                <title> ".concat(title, " </title>\n                <link href=\"assets/style.css\" rel=\"stylesheet\">\n              </head>\n              <body>\n                <div class=\"content\">\n                   <div id=\"app\" class=\"wrap-inner\">\n                      <!--- magic happens here -->  ").concat(content, "\n                   </div>\n                </div>\n\n                  ").concat(scripts, "\n              </body>\n              ");
  return page;
}

module.exports = template;