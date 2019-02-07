// html skeleton provider
function template({
  initialState = {},
  content = '',
  helmet
}) {
  let scripts = ''; // Dynamically ship scripts based on render type
  if (content) {
    scripts = `
<script>
  window.__STATE__ = ${JSON.stringify(initialState)}
</script>
<script src="/bundle.js"></script>
`;
  } else {
    scripts = '<script src="/bundle.js"></script>';
  }
  const page = `
<!DOCTYPE html>
<html lang="en">
  <head>
    ${helmet ? helmet.title.toString() : ''}
    ${helmet ? helmet.meta.toString() : ''}
    ${helmet ? helmet.link.toString() : ''}
  </head>
  <body>
    <div id="app">
      ${content}
    </div>
    ${scripts}
  </body>
</html>
`;

  return page;
}

module.exports = template;
