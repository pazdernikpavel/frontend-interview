const PROXY_CONFIG = [
  {
    context: ['/graphql'],
    target: 'http://localhost:3333',
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
