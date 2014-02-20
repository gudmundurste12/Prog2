module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	

	uglify: {
		options:{
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        	separator: ';' 
		},
		build:{
			src:[
			"src/*.js"
			],
			dest: 'build/chatapp.min.js'
		}

	},

	watch: {

	},

	connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },


	}); // End grunt initConfig

	grunt.registerTask('default', ['uglify','connect', 'watch']);

}; 		// End module.exports
