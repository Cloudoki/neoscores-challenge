const joi = require('joi');
const issue = require('lib/models').issue;
const issuePresenter = require('lib/presenters').issue;
const log = require('lib/helpers/log');

exports = module.exports = {};

exports.create = {
  // auth: 'session',
  validate: {
    options: {
      allowUnknown: true
    },
    payload: {
      title: joi.string().required(),
      description: joi.string().allow(''),
      assignee: joi.string().required(),
      owner: joi.string().required(),
      state: joi.string().valid(issue.states).required(),
      severity: joi.string().valid(issue.severities).required(),
    }
  },
  handler: (request, reply) => {
    log.debug('Creating Issue with payload:', request.payload);

    // TODO
    // Marjor issue: we're not validating that the owner
    // is the logged in user and that the assignee exists
    issue.add(
      {
        title: request.payload.title,
        description: request.payload.description,
        assignee: request.payload.assignee,
        owner: request.payload.owner,
        state: request.payload.state,
        severity: request.payload.severity,
      },
      (err, issue) => {
        if (err) {
          return reply(boom.internal());
        }

        return reply(issuePresenter.present(issue));
      }
    );
  },
  id: 'issue-create'
};

exports.list = {
  // auth: 'session',
  handler: (request, reply) => {
    issue.list((err, issues) => {
      if (err) {
        return reply(boom.notFound('No issues found'));
      }

      return reply({
        meta: {
          // TODO make this actually dynamic
          page: 1,
          numPages: 1
        },
        data: issuePresenter.present(issues)
      });
    });
  },
  id: 'issue-list'
};

exports.view = {
  // auth: 'session',
  validate: {
    params: {
      id: joi.string().required()
    }
  },
  handler: (request, reply) => {
    issue.get(request.params.id, (err, issue) => {
      if (err) {
        return reply(boom.internal());
      }

      return reply(issuePresenter.present(issue));
    });
  },
  id: 'issue-view'
};

exports.remove = {
  // auth: 'session',
  validate: {
    params: {
      id: joi.string().required()
    }
  },
  handler: (request, reply) => {
    issue.remove(request.params.id, (err, issue) => {
      if (err) {
        return reply(boom.internal());
      }

      return reply(issuePresenter.present(issue));
    });
  },
  id: 'issue-remove'
};
