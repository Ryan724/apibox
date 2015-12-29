require(['talent'
	,'collections/welcome-collection'
],function(
	Talent
	,WelcomeCollection
){
	Talent.app.reqres.setHandler('welcome', function(options, operation){
		if(!WelcomeCollection.instance){
			WelcomeCollection.instance = new WelcomeCollection(); 
		}
		return WelcomeCollection.instance[operation](options);
	} );
})