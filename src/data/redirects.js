const redirects = [
  {
    path: '/',
    exact: true,
    to: () => '/en-GB'
  }, {
    path: '/:locale/bots',
    exact: true,
    to: ({match}) => `/${match.params.locale}`
  }, {
    path: '/:locale/bot',
    exact: true,
    to: ({match}) => `/${match.params.locale}`
  }, {
    path: '/:locale/bot/:id',
    exact: true,
    to: ({match}) => `/${match.params.locale}/bots/${match.params.id}`
  }, {
    path: '/:locale/bots/by/:id',
    exact: true,
    to: ({match}) => `/${match.params.locale}/bots/filter?owners[]=${encodeURIComponent(match.params.id)}`
  }, {
    path: '/:locale/bots/category/:category',
    exact: true,
    to: ({match}) => `/${match.params.locale}/bots/filter?category=${encodeURIComponent(match.params.category)}&state=approved`
  }, {
    path: '/:locale/bots/unverified',
    exact: true,
    to: ({match}) => `/${match.params.locale}/bots/filter?state=queue`
  }, {
    path: '/:locale/bots/search',
    exact: true,
    to: ({match}) => `/${match.params.locale}/bots/filter`
  }
];

export default redirects;
