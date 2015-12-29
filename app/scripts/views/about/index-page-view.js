define(['talent'
	,'templates/about'
],function(Talent
	,jst
) {
	var MainView = Talent.Layout.extend({
		template: jst['about/index-page']
		,initialize: function() {
		}
		,regions: {
			// main: '.page-main-region'
		}
		,ui:{
			// item: '.ui-item'
		}
		,events:function(){
			var events = {};
			// events['click ' + this.ui.item] = 'eventHandler';
			return events;
		}
	});

	return Talent.BasePageView.extend({
		mainViewClass : MainView
		,pageTitle: 'About'
	});
});
