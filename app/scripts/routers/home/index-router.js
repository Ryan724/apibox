define(['talent'],function(Talent){
	return Talent.Router.extend({
		routes: {
			"home/feeds": "handler"
		},
		handler: function(){
			alert('handler')
		}
	});
})