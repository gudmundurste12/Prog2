module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    	jshint: {
    		options:{

    		},
    		files:{
    			src:['src/*.js']
    		}
    	},


		watch:{
			files:['src/*']
		},
		connect:{
			server:{
				options:{
					port:8000
				}
			}
		}

	});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'connect', 'watch']);
};