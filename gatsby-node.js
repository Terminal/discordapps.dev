const path = require('path');
const locales = require('./src/locales/index');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  
  // graphql(`
  //   {
      
  //   }
  // `).then(result => {
  //   // For each page...
  //   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //     // Create the page
  //     createPage({
  //       path: node.fields.permalink,
  //       component: path.resolve('./src/templates/items.js'),
  //       context: node.fields
  //     });
  //   });
  // });

  return;
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path;

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang
        }
      });
    });

    resolve();
  });
};

// When Gatsby makes static files, don't use webpack the monaco
exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [{
          test: /monaco-editor/,
          use: loaders.null()
        }]
      }
    });
  }
};
