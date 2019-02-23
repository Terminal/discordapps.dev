const botSchema = {
  authors: [],
  cachedImages: {
    avatar: 'String',
    cover: 'String',
    preview: [],
  },
  category: 'other',
  contents: {},
  count: 0,
  created: 0,
  edited: 0,
  github: {},
  hide: true,
  images: {},
  invite: 'String',
  legacy: false,
  nsfw: false,
  oauth: 'String',
  random: 0,
  state: 'queue',
  support: 'String',
  trigger: {
    customisable: false,
    mentionable: false,
    prefix: [],
  },
  videos: {
    youku: 'String',
    youtube: 'String',
  },
  website: 'String',
  id: 'String'
};

const locales = ['ar','da','de','el','en-GB','es','et','fi','fj','fr','gd','he','hi','it','ja','ko','la','nl','no','pl','pt','ru','sv','tr','vi','zh-cn','zh-tw'];

locales.forEach((locale) => {
  botSchema.contents[locale] = {};
});

module.exports = {
  siteMetadata: {
    title: 'Discord_Fork',
    colour: '#3498db',
    siteUrl: 'https://discordbots.co.uk',
    authenticate: 'https://github.com/login/oauth/authorize?client_id=6fff2201b71ad2d63131&scope=public_repo',
    gatekeeper: 'https://auth.discordbots.co.uk/authenticate'
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        // Type prefix of entities from server
        typePrefix: 'ls__',
  
        // The url, this should be the endpoint you are attempting to pull data from
        url: 'https://ls.terminal.ink/api/v2/bots',
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        name: 'bots',
        entityLevel: 'data',
        verboseOutput: true,
        skipCreateNode: false,

        schemaType: botSchema,
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }
        ]
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap'
  ],
};
