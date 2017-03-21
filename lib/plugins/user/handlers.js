const joi = require('joi');
const boom = require('boom');
const user = require('lib/models').user;
const userPresenter = require('lib/presenters').user;
const log = require('lib/helpers/log');

exports = module.exports = {};

exports.login = {
  // auth: 'session',
  validate: {
    payload: {
      url: joi.string().min(3).max(256)
    }
  },
  handler: (request, reply) => {
    // To be implemented...
  },
  id: 'user-login'
};

exports.list = {
  // auth: 'session',
  handler: (request, reply) => {
    user.list((err, users) => {
      if (err) {
        return reply(boom.notFound('No users found'));
      }

      return reply({
        meta: {
          // TODO make this actually dynamic
          page: 1,
          numPages: 1
        },
        data: userPresenter.present(users)
      });
    });
  },
  id: 'user-list'
};

exports.view = {
  // auth: 'session',
  validate: {
    params: {
      id: joi.string().required()
    }
  },
  handler: (request, reply) => {
    user.get(request.params.id, (err, u) => {
      if (err) {
        return reply(boom.notFound('User not found'));
      }

      return reply(userPresenter.present(u));
    });
  },
  id: 'user-view'
};

exports.me = {
  // auth: 'session',
  handler: (request, reply) => {
    // TODO get the logged in user's id
    user.get('1', (err, user) => {
      if (err) {
        return reply(boom.notFound('User not found'));
      }

      return reply(userPresenter.present(user));
    });
  },
  id: 'user-me'
};
