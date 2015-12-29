define(['talent', 'helpers/context'],
	/**
	 * Abstract network communication by overriding Backbone.sync.<br />
	 * Add add transport to mock data, used for debugging model and collection.
	 * @author kongchangzhu
	 * @exports network
	 */
	function(Talent, Context) {

	var $ = Talent.$;

	/**
	 * Add converter and transport to deal with request with datatype of mock, used in dev.
	 * @name module:network~mockAjax
	 */
	$.ajaxSetup({
		converters: {
			"* mock": true
		},
		headers: {
			"x-beisen-ajax" : "1.0"
		},
		statusCode: {
			401: function (response) {
				login();
			}
			,230:function(){
				Talent.app.vent.trigger('network:error',230);
			}
		}
	});
	$.ajaxTransport('mock',function( options, originalOptions, jqXHR ) {
		return {
			send: function( headers, completeCallback ) {
				completeCallback(200, 'success', {text : options.mockData[options.type]});
			}
		};
	});

	// Backbone.emulateJSON = true;
	Backbone.emulateHTTP = true;

	var originalSync = Backbone.sync;
	/**
	 * Override Default Backbone.sync
	 * @function module:network~sync
	 * @return {Deferred}     Ajax deferred object
	 */
	Backbone.sync = function(method, model, options) {
		if(model.mockData){
			options.dataType = "mock";
			options.mockData = model.mockData;
		}
		return originalSync.apply(Backbone, arguments);
	}

	function login(msg) {
		msg = msg || '您的会话超时，请重新登录。\n点击“确定”后，自动转入登录页面。';
		if(confirm(msg)){
			location.href = Context.getLoginUrl();
			throw new Error('401');
		}
	}

});