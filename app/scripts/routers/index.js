define(['talent'
	,'routers/home/index-router'
],function(Talent
	,HomeRouter
){
	Talent.app.addInitializer(function(){
		new HomeRouter;
	});
})