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

    showHelp: function() {
      var resetModel = $('#reset-modal');
      resetModel.modal();
      resetModel.one('shown.bs.modal', function(event) {
        $('#admin-reset-form').validate({
          errorPlacement: function() {
            return false;
          }
        });
        $('input[name="email"]').focus();
      });
    },

    events: {
      'click #admin-login-button' : 'onClickLogin',
      'click #login-help' : 'showHelp',
      'click #admin-reset-button' : 'resetPassword'
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
    },

    resetPassword: function(event) {
      event.preventDefault();
      var form = $('#admin-reset-form');
      if (!form.valid()) {
        return;
      }
      $(this).startSpin(event.currentTarget);
      var view = this;
      var data = $(this).serializeForm(form);
      $.ajax({
        data: data,
        type: 'POST',
        url: '/admin/reset'
      }).done(function(result) {
        var resetModel = $('#reset-modal');
        resetModel.modal('hide');
        resetModel.one('hidden.bs.modal', function(event) {
          if (result.error) {
            $(this).showInfo('Error', result.error);
          } else {
            $(this).showInfo('Success!', 'Check your email for password reset instructions.');
          }
        });
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