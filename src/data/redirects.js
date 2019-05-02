const redirects = [
  {
    path: '/',
    exact: true,
    status: 301,
    to: () => '/en-GB'
  }, {
    path: '/en-baguette',
    exact: false,
    status: 301,
    to: () => '/en-GB'
  }, {
    path: '/:locale/locale/dev',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/languagescomparisontool`
  }, {
    path: '/:locale/bots/filter',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/filter`
  }, {
    path: '/:locale/boats/',
    exact: false,
    status: 301,
    to: ({match}) => `/${match.params.locale}/bots`
  }, {
    path: '/:locale/bot/',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/bots`
  }, {
    path: '/:locale/bots/by/:id',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/filter?owners[]=${encodeURIComponent(match.params.id)}`
  }, {
    path: '/:locale/bots/category/:category',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/filter?category=${encodeURIComponent(match.params.category)}&state=approved`
  }, {
    path: '/:locale/bots/unverified',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/filter?state=queue`
  }, {
    path: '/:locale/bots/search',
    exact: true,
    status: 301,
    to: ({match}) => `/${match.params.locale}/filter`
  }
];

export default redirects;
