module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'dist/test-controller.js': 'src/controller/test-controller.coffee',
          'dist/progresspie.js': 'src/directive/progresspie.coffee'
        }
      }
    },
    watch: {
      coffee: {
        files: ['src/directive/progresspie.coffee', 'src/controller/test-controller.coffee'],
        tasks: ['coffee']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['coffee']);
};

