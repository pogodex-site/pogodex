module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			options: {
				mangle: false,
			},
			js: {
				files: {
					'front/static/build/script.min.js': [
						
						'front/static/bower_components/angular/angular.min.js',
						'front/static/bower_components/jquery/dist/jquery.min.js',
						'front/static/bower_components/tether/dist/js/tether.min.js',
						'front/static/bower_components/satellizer/dist/satellizer.min.js',
						'front/static/bower_components/bootstrap/dist/js/bootstrap.min.js',
						'front/static/bower_components/angular-cookies/angular-cookies.min.js',
						'front/static/bower_components/angular-translate/angular-translate.min.js',
						'front/static/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
						'front/static/bower_components/angular-ui-router/release/angular-ui-router.min.js',
						
						'front/static/scripts/app.js',
						'front/static/scripts/services.js',
						'front/static/scripts/directives.js',
						'front/static/scripts/controllers.js',
					],
				},
			},
		},
    });
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['uglify']);
};