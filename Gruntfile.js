var jade = require('jade');

module.exports = function(grunt) {

  grunt.initConfig({
    compile: {
      admin: ['login', 'reset'],
      posts: ['list', 'edit']
    }
  });

  grunt.registerMultiTask('compile', 'Compile multiple .jade templates into a single .js file.', function() {
    var target = this.target;
    var contents = '';
    this.data.forEach(function(jadeName) {
      var jadeFile = 'views/'+target+'/'+jadeName+'.jade';
      var funcName = 'template_'+target+'_'+jadeName;
      if (grunt.file.exists(jadeFile)) {
        contents += jade.compileFileClient(jadeFile, {name: funcName}) + '\n\n';
      } else {
        grunt.log.writeln('Jade file does not exist: '+jadeFile);
      }
    });
    if (contents.length > 0) {
      grunt.file.write('public/js/templates/template_'+target+'.js', contents);
      grunt.log.writeln('JS template file successfully written: '+'public/js/templates/template_'+target+'.js');
    }
  });

};