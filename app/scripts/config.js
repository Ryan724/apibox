require.config({
	paths: {
		"backbone": "vendor/components/backbone/index"
		,"$": "vendor/components/jquery/index"
		,"json": "vendor/components/json/index"
		,"marionette": "vendor/components/marionette/index"
		,"_": "vendor/components/lodash/index"
		,"requirejs": "vendor/components/requirejs/index"
		,"talent" : 'vendor/components/talent/index'
		,"paginator" : 'vendor/plugins/paginator'
		
		,"createpage" : 'vendor/plugins/jquery.page'//翻页插件
		,"datatables": 'vendor/plugins/jquery.dataTables'//表格插件
		,"md5": 'vendor/plugins/MD5'
	},
	shim: {
		'$': {
			exports: '$'
		}
		,'_': {
			exports: '_'
		}
		,'backbone': {
			deps: ['json', '_', '$'],
			exports: 'Backbone'
		}
		,'marionette': {
			deps: ['backbone'],
			exports: 'Marionette'
		}
		,'talent': {
			deps: ['marionette'],
			exports: 'Talent'
		}
		,"switchpage":{
			deps:['$']
		}
		,"createpage":{//插件实验
			deps:['$']
		}
		,"datatables":{
			deps:['$']
		}
		,"md5":{
			deps:['$']
		}
	}
}); 