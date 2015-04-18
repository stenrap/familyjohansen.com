'use strict';
var FJ = FJ || {};

$(function() {

  /* Login View */

  FJ.LoginView = Backbone.View.extend({

    initialize: function(options) {
      this.router = options.router;
      this.render();
    },

    events: {
      'click #admin-login-button' : 'onClickLogin',
      'click #login-help' : 'showHelp'
    },

    render: function() {
      this.$el.html(template_admin_login());
      $('#admin-login-form').validate({
        errorPlacement: function() {
          return false;
        }
      });
      $('input[name="username"]').focus();
    },

    showHelp: function() {
      this.router.navigate('help', {trigger: true});
    },

    onClickLogin: function(event) {
      event.preventDefault();
      var form = $('#admin-login-form');
      if (!form.valid()) {
        return;
      }
      $(this).startSpin(event.currentTarget);
      var data = $(this).serializeForm(form);
      $.ajax({
        data: data,
        type: 'POST',
        url: '/admin/login'
      }).done(function(result) {
        // TODO .... Check for an error (such as "Invalid username or password") and handle it.
        //           Then handle the success case (show the list of posts)!
      }).always(function() {
        $(this).stopSpin();
      });
    }

  });


  /* Help View */

  FJ.HelpView = Backbone.View.extend({

    initialize: function(options) {
      this.router = options.router;
      this.render();
    },

    events: {
      'click #admin-help-button' : 'helpPassword'
    },

    render: function() {
      this.$el.html(template_admin_help());
      $('#admin-help-form').validate({
        errorPlacement: function() {
          return false;
        }
      });
      $('input[name="email"]').focus();
    },

    helpPassword: function(event) {
      event.preventDefault();
      var form = $('#admin-help-form');
      if (!form.valid()) {
        return;
      }
      var emailInput = $('input[name="email"]');
      emailInput.attr('readonly', true);
      $(this).startSpin(event.currentTarget);
      var view = this;
      var data = $(this).serializeForm(form);
      $.ajax({
        data: data,
        type: 'POST',
        url: '/admin/reset'
      }).done(function(result) {
        if (result.error) {
          $(this).showInfo('Error', result.error, null, function() {
            emailInput.attr('readonly', false);
            emailInput.focus();
          });
        } else {
          $(this).showInfo('Success!', 'Check your email for password reset instructions.', view, view.showLogin);
        }
      }).always(function() {
        $(this).stopSpin();
      });
    },

    showLogin: function(view) {
      view.router.navigate('login', {trigger: true});
    }

  });


  /* Reset View */

  FJ.ResetView = Backbone.View.extend({

    initialize: function(options) {
      this.router = options.router;
      this.token = options.token;
      this.render();
    },

    events: {
      'click #admin-reset-button' : 'resetPassword'
    },

    render: function() {
      if (!this.token) {
        $(this).showInfo('Error', 'The time for this password reset has expired. Please start again.', this, function(view) {
          view.router.navigate('help', {trigger: true});
        });
        return;
      }

      // WYLO 2 .... Put the token in a hidden field

      this.$el.html(template_admin_reset());
      $('#admin-reset-form').validate({
        errorPlacement: function() {
          return false;
        }
      });
      $('input[name="password1"]').focus();
    },

    resetPassword: function() {
      event.preventDefault();
      var form = $('#admin-reset-form');
      if (!form.valid()) {
        return;
      }
      var password1Input = $('input[name="password1"]');
      var password2Input = $('input[name="password2"]');
      password1Input.attr('readonly', true);
      password2Input.attr('readonly', true);
      $(this).startSpin(event.currentTarget);
      var view = this;
      var data = $(this).serializeForm(form);
      // WYLO 3 .... Post the new password (and hidden token) somewhere.
    }

  });


  /* Admin Router */

  FJ.AdminRouter = Backbone.Router.extend({

    routes: {
      '':      'login',
      'login': 'login',
      'help':  'help',
      'reset': 'reset'
    },

    login: function() {
      new FJ.LoginView({
        el: '#content',
        router: this
      })
    },

    help: function() {
      new FJ.HelpView({
        el: '#content',
        router: this
      })
    },

    reset: function() {
      new FJ.ResetView({
        el: '#content',
        router: this,
        token: $.cookie("token")
      })
    }

  });

  new FJ.AdminRouter();

  Backbone.history.start();

});