const redirects = [
  {
    path: '/',
    exact: true,
    status: 301,
    to: () => '/en-GB'
  }, {
    path: '/:locale/bots',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}`
  }, {
    path: '/:locale/bot',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}`
  }, {
    path: '/:locale/bot/:id',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/bots/${match.params.id}`
  }, {
    path: '/:locale/bots/by/:id',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/bots/filter?owners[]=${encodeURIComponent(match.params.id)}`
  }, {
    path: '/:locale/bots/category/:category',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/bots/filter?category=${encodeURIComponent(match.params.category)}&state=approved`
  }, {
    path: '/:locale/bots/unverified',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/bots/filter?state=queue`
  }, {
    path: '/:locale/bots/search',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/bots/filter`
  }
];

export default redirects;
