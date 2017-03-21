// Recruitment Challenge Issue Tracker
// Author: Tiago Alves (tiago.alves@cloudoki.com)

RcIssueTracker = (function () {

  var URL_BASE = 'http://localhost:3000/api/v1';

  var ISSUE_STATES = {
    open: 'Open',
    assigned: 'Assigned',
    closed: 'Closed'
  };

  var ISSUE_SEVERITIES = {
    level10: 'Trivial',
    level20: 'Low',
    level30: 'Medium',
    level40: 'High',
    level50: 'Critical'
  };

  $(function() {

    // The individual Issue model
    var Issue = Backbone.Model.extend({
      defaults: function() {
        return {
          title: '',
          description: '',
          owner: null,
          assignee: null,
          // One of ISSUE_STATES
          state: '',
          // One of ISSUE_SEVERITIES
          severity: '',
        };
      }

    });

    // The Issue Collection
    var IssueList = Backbone.Collection.extend({
      url: URL_BASE + '/issues',
      model: Issue,
      parse: function (payload) {
        // Our list result is namespaced so we have to
        // tell Backbone where the actual issues list is.
        return payload.data;
      }
    });

    var Issues = new IssueList;

    // The view of an individual issue.
    var IssueListView = Backbone.View.extend({

      // Each issue entry is a table row
      tagName:  "tr",

      template: _.template($('#issue-list-template').html()),

      events: {
        "click button.destroy": "clear",
      },

      initialize: function() {
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function() {
        var owner = Users.get(this.model.get('owner'));
        var assignee = Users.get(this.model.get('assignee'));

        this.$el.html(
          this.template({
            issue: this.model.toJSON(),
            owner: owner && owner.toJSON(),
            assignee: assignee && assignee.toJSON()
          })
        );
        return this;
      },

      // Remove the item, destroy the model.
      clear: function() {
        this.model.destroy();
      }

    });

    // The individual User model
    var User = Backbone.Model.extend({

      defaults: function() {
        return {
          id: null,
          name: '',
        };
      }

    });

    // The User Collection
    var UserList = Backbone.Collection.extend({
      url: URL_BASE + '/users',
      model: User,
      parse: function (payload) {
        // Our list result is namespaced so we have to
        // tell Backbone where the actual users list is.
        return payload.data;
      }
    });

    var Users = new UserList;

    var AppView = Backbone.View.extend({
      // We bind to the existing skeleton of
      // the App already present in the HTML.
      el: $("#main"),

      // Delegated events for creating new items
      events: {
        "submit #form-issue-entry": "formSubmit"
      },

      initialize: function() {
        this.severities = this.$("#new-entry-severity");
        this.assignees = this.$("#new-entry-assignee");
        this.formTitle = this.$("#new-entry-title");
        this.formDescription = this.$("#new-entry-description");

        this.listenTo(Issues, 'add', this.issuesAddOne);
        this.listenTo(Users, 'add', this.usersAddOne);

        this.footer = this.$('footer');
        this.main = $('#main');

        this.renderInputForm();

        $.when(Users.fetch()).done(function () {
          // Make sure we fetch the users before the
          // issues since the issues depend on them.
          Issues.fetch();
        });
      },

      renderInputForm: function() {
        for (var severity in ISSUE_SEVERITIES) {
          this.severities.append(
            $("<option />")
              .val(severity)
              .text(ISSUE_SEVERITIES[severity])
          );
        }
      },

      render: function() {
      },

      usersAddOne: function (user) {
        // When a user is added (actually, fetched from the back-end),
        // we add it to our assignees select box.
        this.assignees.append(
          $("<option />")
            .val(user.get('id'))
            .text(user.get('name'))
        );
      },

      issuesAddOne: function(issue) {
        var view = new IssueListView({ model: issue });
        this.$("#issues-list tbody").append(view.render().el);
      },

      // On adding a new issue, add it to the issue list (table)
      // and, consequently, to the back-end.
      // Check the Chrome Dev Tools' Network tab for confirmation.
      // But you can also simply refresh the page to confirm that
      // the issue is fetched from the back-end.
      formSubmit: function(e) {

        var assignee = this.assignees.val();

        Issues.create(
          {
            title: this.formTitle.val(),
            description: this.formDescription.val(),
            // TODO set to the current user
            owner: '1',
            assignee: (assignee || null),
            state: assignee ? 'assigned' : 'open',
            severity: this.severities.val(),
          },
          { wait: true }
        );

        // Reset all the form elements.
        this.severities.val('');
        this.assignees.val('');
        this.formTitle.val('');
        this.formDescription.val('');

        // Prevent the form actually submitting and refreshing the page.
        return false;
      }

    });

    // Finally, we kick things off by creating the **App**.
    var App = new AppView;

  });

  // The actual RcIssueTracker object
  return {
    issueStates: ISSUE_STATES,
    issueSeverities: ISSUE_SEVERITIES
  }

})();