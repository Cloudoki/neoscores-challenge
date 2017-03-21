'use strict';

// In order to meet the project delivery deadline, we're not using
// a database for our data persistence. In a production system, the
// User list should obviously be stored in a database.
// I'm perfectly aware that this isn't a good practice and that it's
// slow and not scalable.
const users = {
  'rc_1': {
    id: '1',
    email: 'nils.de.moor@gmail.com',
    name: 'Nils De Moor',
    // TODO - use bcrypt
    password: 'neoscores'
  },
  'rc_2': {
    id: '2',
    email: 'timbl@w3.org',
    name: 'Tim Berners-Lee',
    // TODO - use bcrypt
    password: 'timtheman'
  },
  'rc_3': {
    id: '3',
    email: 'ry@ryandahl.com',
    name: 'Ryan Dahl',
    // TODO - use bcrypt
    password: 'rytheman'
  },
  'rc_4': {
    id: '4',
    email: 'tiago.alves@cloudoki.com',
    name: 'Tiago Alves',
    // TODO - use bcrypt
    password: 'cloudoki'
  }
};

exports = module.exports = {};

/**
 * List all users
 *
 * @param function callback    A callback function with the signature
 *                             function (err, users) where:
 *                             - err: an Error or null
 *                             - users: an array with all the users
 *
 * @return undefined
 */
exports.list = function (callback) {
  // Yes, ugly and inefficient, I know.
  let listArray = [];
  for (let id in users) {
    if (!users.hasOwnProperty(id)) {
      continue;
    }
    listArray.push(users[id]);
  }

  return callback(null, listArray);
};

/**
 * Get a single user
 *
 * @param string   id          The user id.
 * @param function callback    A callback function with the signature
 *                             function (err, user) where:
 *                             - err: an Error or null
 *                             - user: the user, if found
 *
 * @return undefined
 */
exports.get = function (id, callback) {

  // We prefix the object keys with 'rc_' so
  // that a malicious user cannot get unwanted
  // properties of our users object
  let user = users['rc_' + id];

  if (!user) {
    return callback(new Error('User not found'));
  }

  return callback(null, user);
};

/**
 * Checks if a user exists and that she has the given password.
 *
 * @param email    string      The user's email address
 * @param password string      The user's password
 * @param function callback    A callback function with the signature
 *                             function (err, user) where:
 *                             - err: an Error or null
 *                             - user: the user, if email and password match
 *
 * @return undefined
 */
exports.checkAuthentication = function (email, password, callback) {

  for (let id in users) {
    if (!users.hasOwnProperty(id)) {
      continue;
    }
    if (users[id].email !== email) {
      continue;
    }

    if (users[id].password !== password) {
      return callback(new Error('Wrong password provided'));
    }
    
    return callback(null, users[id]);

  }

  return callback(new Error('User not found'));
};
