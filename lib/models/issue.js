'use strict';

const ISSUE_STATES = {
  open: 'open',
  assigned: 'assigned',
  closed: 'closed'
};

const ISSUE_SEVERITIES = {
  level10: 'level10',
  level20: 'level20',
  level30: 'level30',
  level40: 'level40',
  level50: 'level50'
};


// In order to meet the project delivery deadline, we're not using
// a database for our data persistence. In a production system, the
// Issue list should obviously be stored in a database.
// I'm perfectly aware that this isn't a good practice and that it's
// slow and not scalable.
const issues = {
  'rc_1': {
    id: '1',
    title: 'Use a front-end build process',
    description: 'We should consider using webpack or browserify',
    owner: '1',
    assignee: '2',
    state: ISSUE_STATES.assigned,
    severity: ISSUE_SEVERITIES.level40,
  },
  'rc_2': {
    id: '2',
    title: 'Use a linting tool',
    description: 'Consider using eslint with the AirBnB standard or semistandard.js',
    owner: '1',
    assignee: '2',
    state: ISSUE_STATES.assigned,
    severity: ISSUE_SEVERITIES.level30,
  },
};

let autoIncrementId = Object.keys(issues).length;

exports = module.exports = {};

exports.states = Object.keys(ISSUE_STATES);

exports.severities = Object.keys(ISSUE_SEVERITIES);

/**
 * List all issues
 *
 * @param {function} callback    A callback function with the signature
 *                               function (err, issues) where:
 *                               - err: an Error or null
 *                               - issues: an array with all the issues
 *
 * @return undefined
 */
exports.list = function (callback) {

  // Yes, ugly and inefficient, I know.
  let listArray = [];
  for (let id in issues) {
    if (!issues.hasOwnProperty(id)) {
      continue;
    }
    listArray.push(issues[id]);
  }

  return callback(null, listArray);
};

/**
 * Get a single issue
 *
 * @param {string}   id          The issue id.
 * @param {function} callback    A callback function with the signature
 *                               function (err, issue) where:
 *                               - err: an Error or null
 *                               - issue: the issue, if found
 *
 * @return undefined
 */
exports.get = function (id, callback) {

  // We prefix the object keys with 'rc_' so
  // that a malicious user cannot get unwanted
  // properties of our issues object
  let issue = issues['rc_' + id];

  if (!issue) {
    return callback(new Error('Issue not found'));
  }

  return callback(null, issue);
};

/**
 * Get a single issue
 *
 * @param {string}   id          The issue id.
 * @param {function} callback    A callback function with the signature
 *                               function (err, issue) where:
 *                               - err: an Error or null
 *                               - issue: the issue, if found
 *
 * @return undefined
 */
exports.remove = function (id, callback) {

  let issue = issues['rc_' + id];

  if (!issue) {
    return callback(new Error('Issue not found'));
  }

  delete issues['rc_' + id];
  return callback(null, issue);
};



/**
 * Add a new issue
 *
 * @param object issue        The new issue to add
 * @param function callback   A callback function with the signature
 *                            function (err, issue) where:
 *                            - err: an Error or null
 *                            - issue: the issue, if stored successfully
 *
 * @return undefined
 */
exports.add = function (issue, callback) {

  let nextId = '' + (++autoIncrementId);
  issue.id = nextId;
  issues['rc_' + nextId] = issue;

  return callback(null, issue);
};

