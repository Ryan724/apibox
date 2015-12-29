define(['talent'
	,'templates/home'
],function(Talent
	,jst
) {
	/**
	 * Inner main view class
	 * @class HomeView~MainView
	 * @extends {Backbone.View}
	 */	
	var MainView = Talent.Layout.extend(
	{
		template: jst['home/index-page']
		,className: 'home-page-container'
		,initialize: function() {}
		,events:function(){}
		,onRender: function(){}
		,onShow: function() {
		}
		,onClose:function(){}
	});
	return Talent.BasePageView.extend({
		mainViewClass : MainView
		,pageTitle: 'Home'
	});
});
