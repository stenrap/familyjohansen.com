'use strict';
var FJ = FJ || {};

$(function() {

  FJ.LoginView = Backbone.View.extend({

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(template_admin_login());
    }

  });

  FJ.AdminRouter = Backbone.Router.extend({

    routes: {
      "":      "login",
      "login": "login"
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