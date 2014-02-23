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
		concat:{
			options:{
				separator: ';',
			},
			dist:{
				src:[
					'src/Main.js',
					'src/Globals.js',
					'src/LoginCtrl.js',
					'src/HomeCtrl.js'
					],
				dest:'dest/out.min.js',
			}
		},
		uglify:{
			options:{

			},
			my_target:{
				files:{
					'dest/ugly.min.js' : ['dest/out.min.js']
				}
			}
		},
		clean:{
			src:['dest/out.min.js']
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'clean', 'connect', 'watch']);
};