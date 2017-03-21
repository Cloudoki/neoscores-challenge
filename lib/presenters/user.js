exports = module.exports = {};

// We use a presenter to make sure we don't leak any internal or private
// data and that we have a decoupled private and public representation of our models.
// This also allows us to change our internal data and more easily keep
// backwards compatibility with our clients.
exports.present = function (user) {
  if (Array.isArray(user)) {
    return user.map(presentSingle);
  }
  return presentSingle(user);
 };

function presentSingle(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
