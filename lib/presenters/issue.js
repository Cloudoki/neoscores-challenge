exports = module.exports = {};

// We use a presenter to make sure we don't leak any internal or private
// data and that we have a decoupled private and public representation of our models.
// This also allows us to change our internal data and more easily keep
// backwards compatibility with our clients.
exports.present = function (issue) {
  if (Array.isArray(issue)) {
    return issue.map(presentSingle);
  }
  return presentSingle(issue);
 };

function presentSingle(issue) {
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    owner: issue.owner,
    assignee: issue.assignee,
    state: issue.state,
    severity: issue.severity
  };
}
