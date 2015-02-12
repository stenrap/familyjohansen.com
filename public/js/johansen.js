'use strict';
var FJ = FJ || {};

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
  }

});