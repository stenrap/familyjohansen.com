'use strict';
var FJ = FJ || {};

$(function() {

  FJ.LoginView = Backbone.View.extend({

    initialize: function() {
      this.renderLogin();
    },

    renderLogin: function() {
      this.$el.html(template_admin_login());
      $('#admin-login-form').validate({
        errorPlacement: function() {
          return false;
        }
      });
      $('input[name="username"]').focus();
    },

    renderHelp: function() {
      this.$el.html(template_admin_reset());
      $('#admin-reset-form').validate({
        errorPlacement: function() {
          return false;
        }
      });
      $('input[name="email"]').focus();
    },

    events: {
      'click #admin-login-button' : 'onClickLogin',
      'click #login-help' : 'renderHelp',
      'click #admin-reset-button' : 'resetPassword',
      'click #reset-back' : 'renderLogin'
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
        // WYLO 2 .... Check for an error (such as "Invalid username or password") and handle it.
        //             Then handle the success case (show the list of posts)!
      }).always(function() {
        $(this).stopSpin();
      });
    },

    resetPassword: function(event) {
      event.preventDefault();
      var form = $('#admin-reset-form');
      if (!form.valid()) {
        return;
      }
      $(this).startSpin(event.currentTarget);
      var data = $(this).serializeForm(form);
      $.ajax({
        data: data,
        type: 'POST',
        url: '/admin/reset'
      }).done(function(result) {
        // WYLO 1 .... Check for an error (such as "Invalid email address") and handle it.
        //             Then handle the success case (display a message and return to the login).
      }).always(function() {
        $(this).stopSpin();
      });
    }

  });

  FJ.AdminRouter = Backbone.Router.extend({

    routes: {
      '':      'login',
      'login': 'login'
    },

    login: function() {
      new FJ.LoginView({
        el: '#content'
      })
    }

  });

  new FJ.AdminRouter();

  Backbone.history.start();

});