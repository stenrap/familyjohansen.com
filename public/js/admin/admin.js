'use strict';
var FJ = FJ || {};

$(function() {

  FJ.LoginView = Backbone.View.extend({

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(template_admin_login());
    },

    events: {
      'click #admin-login-button' : 'onClickLogin'
    },

    onClickLogin : function(event) {
      event.preventDefault();
      var data = $(this).serializeForm($('#admin-login-form'));
      // WYLO .... POST it baby!
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