module.exports = function( grunt ) {
	'use strict';

	var config = {
		pkg: grunt.file.readJSON('package.json')
		,banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd H:MM") %> */'
		,watch: {
			options: {
				livereload: false
			}
			,jst: {
				files: [
					'app/templates/**/*.html'
				]
				,tasks: 'jst'
			}
		}
		,requirejs: {
			options: {
				appDir: "app"
				,baseUrl: "./scripts"
				,mainConfigFile: "app/scripts/config.js"
				,dir: "release/app"
				,optimizeCss: "none"
				,skipDirOptimize: true
				,optimize: "none"
				,preserveLicenseComments: false
				,keepBuildDir: true
				,removeCombined: false
			}
			,mainIncludeFiles:[
				'requirejs'
				,'main'
				,'talent'
				,'collections/index', 'routers/index'
				,'helpers/index', 'network/index'
				,"views/common/layouts/master-layout"
				,"views/common/layouts/empty-layout"
				,"views/common/page-regions/content-view"
				,"views/common/page-regions/footer-view"
				,"views/common/page-regions/header-view"
				,"views/common/page-regions/sidebar-view"
				,"views/common/json/json-page-view"
			]
			,main: {
				options: {
					modules: [
						{
							name: "main"
							,include: '<%= requirejs.mainIncludeFiles %>'
						}
					]
				}
			}
		}
		,uglify: {
			options : {
				banner: '<%= banner %>'
        		// ,report: 'gzip'
				,preserveComments: false
			}
			,main: {
				files: {
					'release/app/scripts/main.min.js': ['release/app/scripts/main.js']
				}
			}
		}
		,jst: {
			options: {
				prettify: true,
				// namespace: 'jst',
				processName: function(filename) {
					var index = filename.lastIndexOf('/');
					return filename.replace("app/templates/","").split(".")[0];
				},
				amd: true
			}
			,common: {
				src: ["app/templates/common/**/*.html"],
				dest: "app/scripts/templates/common.js"
			}
		}
		,cssjoin: {
			join :{
				files: {
					'release/app/styles/css/all.css': ['app/styles/css/all.css'],
				}
			}
		}
		,cssmin: {
			options: {
				// report: 'gzip',
				banner: '<%= banner %>'
			},
			compress: {
				files: {
				  'release/app/styles/css/all.min.css': ['release/app/styles/css/all.css']
				}
			}
		}
		,connect: {
			server: {
				options: {
					hostname: 'localhost'
					// ,port: 8000
					,base: 'app'
					,open: 'http://localhost:8000'
				}
			}
		}
		,concurrent: {
			jst: ['jst:common']
			,rjs: ['requirejs:mainIncludeFiles']	// fix: rjs copy conflict
			,requirejs: ['requirejs:main']
			,uglify: ['uglify:main']
		}
	};


	var channels = grunt.file.expand('app/scripts/views/*');
	var blackList = ['common'];

	for(var i=0; i<channels.length; i++){
		var channel = channels[i];
		var channelName = channel.slice(channel.lastIndexOf('/')+1);
		if(!grunt.file.isDir(channel) 
			|| (blackList.indexOf(channelName) > -1)
			|| !grunt.file.isFile(channel, 'index-page-view.js')
		){
			continue;
		}
		config.jst[channelName] = {
			src: ["app/templates/"+channelName+"/**/*.html"],
			dest: "app/scripts/templates/"+channelName+".js"
		};
		config.requirejs[channelName] = {
			options: {
				modules: [
					{
						name: "views/"+channelName+"/index-page-view"
						,exclude: '<%= requirejs.mainIncludeFiles %>'
					}
				]
			}
		};
		config.uglify[channelName] = {
			src: ["release/app/scripts/views/"+channelName+"/index-page-view.js"],
			dest: "release/app/scripts/views/"+channelName+"/index-page-view.min.js"
		};

		config.concurrent.jst.push('jst:'+channelName);
		config.concurrent.requirejs.push('requirejs:'+channelName);
		config.concurrent.uglify.push('uglify:'+channelName);
	}

	grunt.initConfig(config);


	grunt.registerTask('js', ['concurrent']);
	grunt.registerTask('css', ['cssjoin','cssmin']);
	grunt.registerTask('watch', ['jst','watch']);
	grunt.registerTask('server', ['jst','connect','watch']);

	require('load-grunt-tasks')(grunt);

};
