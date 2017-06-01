module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			css: {
				src: [
					'front/build/css/fonts.css',
					
					'front/vendor/bootstrap/css/bootstrap.min.css',
					'front/vendor/flag-icon-css/css/flag-icon.min.css',
					'front/vendor/font-awesome/css/font-awesome.min.css',
					'front/vendor/angular-toastr/css/angular-toastr.min.css',
					
					'front/build/css/styles.css',
				],
				dest: 'front/static/front/css/concat.css'
			},
			js: {
				src: [
					'front/vendor/tether/js/tether.min.js',
					'front/vendor/jquery/js/jquery.min.js',
					'front/vendor/angular/js/angular.min.js',
					'front/vendor/bootstrap/js/bootstrap.min.js',
					'front/vendor/satellizer/js/satellizer.min.js',
					'front/vendor/angular-cookies/js/angular-cookies.min.js',
					'front/vendor/angular-toastr/js/angular-toastr.tpls.min.js',
					'front/vendor/angular-translate/js/angular-translate.min.js',
					'front/vendor/angular-ui-router/js/angular-ui-router.min.js',
					
					'front/build/scripts/services.js',
					'front/build/scripts/app.js',
					'front/build/scripts/directives.js',
					'front/build/scripts/controllers.js',
				],
				dest: 'front/static/front/js/concat.js'
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('default', ['concat']);
};