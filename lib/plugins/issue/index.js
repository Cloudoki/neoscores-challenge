const handlers = require('./handlers');

exports.register = function (server, options, next) {

  server.route([
    {
      method: 'POST',
      path: '/issues',
      config: handlers.create
    },
    {
      method: 'GET',
      path: '/issues',
      config: handlers.list
    },
    {
      method: 'GET',
      path: '/issues/{id}',
      config: handlers.view
    },
    {
      method: 'DELETE',
      path: '/issues/{id}',
      config: handlers.remove
    },
  ]);

  next();
};

exports.register.attributes = {
  name: 'rc-issue'
};