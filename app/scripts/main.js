/**
 * Project entry function <br />
 * @name module:main~init
 */


require(['config'], function(mainConfigFile){
	require(['talent','collections/index', 'routers/index', 'helpers/index', 'network/index'],
		function(Talent, IndexCollection, IndexRouter, IndexHelper, IndexNetwork){
			Talent.app.start(
				_.extend({},window.BSGlobal || {})
			);
	});
});