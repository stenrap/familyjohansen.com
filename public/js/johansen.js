'use strict';
var FJ = FJ || {};

FJ.Post = Backbone.Model.extend({

});

FJ.Posts = Backbone.Collection.extend({
  model: FJ.Post,
  url: '/admin/posts'
});

jQuery.fn.extend({

  serializeForm: function(form) {
    var formData = {};
    for (var i = 0; i < form[0].elements.length; i++) {
      var element = form[0].elements[i];
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    return formData;
  },

  startSpin: function(button) {
    FJ.ladda = Ladda.create(button);
    FJ.ladda.start();
  },

  stopSpin: function() {
    FJ.ladda.stop();
  },

  showInfo: function(title, message, thisContext, callback) {
    $('#info-modal-title').html(title);
    $('#info-modal-message').html(message);
    var infoModal = $('#info-modal');
    infoModal.modal();
    infoModal.on('shown.bs.modal', function() {
      infoModal.find('button').focus();
    });
    if (callback) {
      infoModal.one('hidden.bs.modal', function (e) {
        callback(thisContext);
      })
    }
  }

});