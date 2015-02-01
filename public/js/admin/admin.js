'use strict';
var FJ = FJ || {};

$(function() {

  FJ.LoginView = Backbone.View.extend({

    render: function() {
      // Here's what I'd like to be able to do: this.$el.html(templates.admin.login())...
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