const handlers = require('./handlers');

exports.register = function (server, options, next) {

  server.route([
    {
      method: 'POST',
      path: '/login',
      config: handlers.login
    },
    {
      method: 'GET',
      path: '/users',
      config: handlers.list
    },
    {
      method: 'GET',
      path: '/me',
      config: handlers.me
    },
    {
      method: 'GET',
      path: '/users/{id}',
      config: handlers.view
    },
  ]);

  next();
};

exports.register.attributes = {
  name: 'rc-user'
};