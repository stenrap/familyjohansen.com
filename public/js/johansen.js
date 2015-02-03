/* Application-wide functions */

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
  }

});