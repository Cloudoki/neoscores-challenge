const Inert = require('inert');
const log = require('lib/helpers/log');

exports.register = function (server, options, next) {

  server.register(Inert);

  // Configure the fall-back routes that will be handled
  // as static file requests
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });

  // If no file was found, return the SPA's index.html file
  // and let the SPA itself handle the routing.
  // (Not implemented yet in the SPA)
  server.ext('onPostHandler', function (request, reply) {

    const response = request.response;
    if (response.isBoom &&
        response.output.statusCode === 404) {

      return reply.file('index.html');
    }

    return reply.continue();
  });

  next();
};

exports.register.attributes = {
  name: 'rc-static'
};