// Recruitment Challenge Issue Tracker
// Author: Tiago Alves (tiago.alves@cloudoki.com)

jQuery(function($) {

  // Set up input validation for the issue tracker creation form.
  $('#form-issue-entry').parsley({
    errorsContainer: function(pEle) {
      return pEle.$element.next('.validation-errors');
    }
  });

});
