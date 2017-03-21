'use strict';

const Hapi = require('hapi');
const path = require('path');

const config = require('config');

// Create the Hapi Server and configure
// the static file server part
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({ port: config.port });

server.register([
  // Register the user handling plugin
  {
    register: require('./lib/plugins/user/index.js'),
    routes: { prefix: '/api/v1' }
  },
  // Register the issue handling plugin
  {
    register: require('./lib/plugins/issue/index.js'),
    routes: { prefix: '/api/v1' }
  },
  // Register the static file handling plugin
  { register: require('./lib/plugins/static/index.js') },
], () => {

  // Actually start the server (start listening for incoming requests)
  server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
});
