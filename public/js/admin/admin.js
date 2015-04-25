'use strict';
var FJ = FJ || {};

$(function() {

  /* Login View */

  FJ.LoginView = Backbone.View.extend({

    initialize: function(options) {
      this.router = options.router;
      if ($.cookie('authenticated')) {
        this.router.navigate('posts', {trigger: true});
        return;
      }
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
      var view = this;
      $.ajax({
        data: data,
        type: 'POST',
        url: '/admin/login'
      }).done(function(result) {
        if (result.error) {
          $(this).showInfo('Error', result.error, view, function(thisContext) {
            $('input[name="password"]').focus();
          });
          $(this).stopSpin();
          return;
        }
        FJ.admin = {
          id: result.id,
          username: result.username,
          email: result.email
        };
        view.router.navigate('posts', {trigger: true});
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

      this.$el.html(template_admin_reset());
      $('#admin-reset-form').validate({
        errorPlacement: function() {
          return false;
        }
      });

      $('input[name="token"]').val(this.token);
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
      if (password1Input.val() != password2Input.val()) {
        $(this).showInfo('Error', "The passwords don't match.", null, function() {
          password1Input.focus();
        });
        return;
      }
      password1Input.attr('readonly', true);
      password2Input.attr('readonly', true);
      $(this).startSpin(event.currentTarget);
      var view = this;
      var data = $(this).serializeForm(form);
      $.ajax({
        data: data,
        type: 'PUT',
        url: '/admin/reset'
      }).done(function(result) {
        if (result.error) {
          $(this).showInfo('Error', result.error, null, function() {
            password1Input.attr('readonly', false);
            password2Input.attr('readonly', false);
            password1Input.focus();
          });
        } else {
          $(this).showInfo('Success!', 'Your password has been reset.', view, function() {
            view.router.navigate('login', {trigger: true});
          });
        }
      }).always(function() {
        $(this).stopSpin();
      });
    }

  });

  /* Posts View */

  FJ.PostsView = Backbone.View.extend({

    initialize: function(options) {
      var view = this;
      this.router = options.router;
      this.posts = new FJ.Posts();
      this.posts.fetch({
        success: function(collection, response, options) {
          view.render();
        },
        error: function(collection, response, options) {
          if (response.status == '302' && response.responseText == 'login') {
            view.router.navigate('login', {trigger: true});
          }
        }
      });
    },

    events: {
      'click #new-post' : 'newPost'
    },

    render: function() {
      this.$el.html(template_admin_posts());
    },

    newPost: function() {
      this.router.navigate('posts/new', {trigger: true});
    }

  });

  /* Edit Post View */

  FJ.EditPostView = Backbone.View.extend({

    initialize: function(options) {
      if (options.create) {
        this.post = new FJ.Post();
      } else {
        // TODO .... Get the post from the appropriate location and set this.post equal to it...
      }
      this.router = options.router;
    },

    events: {

    }

  });


  /* Admin Router */

  FJ.AdminRouter = Backbone.Router.extend({

    routes: {
      '':      'login',
      'login': 'login',
      'help':  'help',
      'reset': 'reset',
      'posts': 'posts',
      'posts/new' : 'newPost'
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
    },

    posts: function() {
      new FJ.PostsView({
        el: '#content',
        router: this
      })
    },

    newPost: function() {
      new FJ.EditPostView({
        el: '#content',
        router: this,
        create: true
      })
    }

  });

  new FJ.AdminRouter();

  Backbone.history.start();

});