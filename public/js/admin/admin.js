'use strict';
var FJ = FJ || {};

$(function() {

  FJ.LoginView = Backbone.View.extend({

    initialize: function() {
      this.render();
      $('#admin-login-form').validate({
        errorPlacement: function() {
          return false;
        }
      });
    },

    render: function() {
      this.$el.html(template_admin_login());
    },

    events: {
      'click #admin-login-button' : 'onClickLogin',
      'click #login-help' : 'onClickHelp'
    },

    onClickLogin : function(event) {
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
        //           Then handle the success case.
        $(this).stopSpin();
      });
    },

    onClickHelp: function(event) {
      this.$el.html(template_admin_reset());
      $('input[name="email"]').focus();
      // WYLO 1 .... Update reset.jade to have a 'Back' button. Then implement actual password reset.
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