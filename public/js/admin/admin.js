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
      'click #admin-reset-button' : 'resetPassword'
    },

    render: function() {
      this.$el.html(template_admin_help());
      $('#admin-reset-form').validate({
        errorPlacement: function() {
          return false;
        }
      });
      $('input[name="email"]').focus();
    },

    resetPassword: function(event) {
      event.preventDefault();
      var form = $('#admin-reset-form');
      if (!form.valid()) {
        return;
      }
      $('input[name="email"]').attr('readonly', true);
      $(this).startSpin(event.currentTarget);
      var view = this;
      var data = $(this).serializeForm(form);
      $.ajax({
        data: data,
        type: 'POST',
        url: '/admin/reset'
      }).done(function(result) {
        if (result.error) {
          $(this).showInfo('Error', result.error, view, view.showLogin);
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
      // WYLO .... Create an instance of FJ.ResetView for resetting the password...
      console.log('The token is: '+$.cookie("token"));
    }

  });

  new FJ.AdminRouter();

  Backbone.history.start();

});