require(['talent'
	,'collections/apibox-collection'
],function(
	Talent
	,ApiboxCollection
){
	Talent.app.reqres.setHandler('apibox', function(options, operation){
		if(!ApiboxCollection.instance){
			ApiboxCollection.instance = new ApiboxCollection(); 
		}
		return ApiboxCollection.instance[operation](options);
	} );
})