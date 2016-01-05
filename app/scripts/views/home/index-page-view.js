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
		,events:function(){
			var events= {};
			events["click .single-p"] = this.clkSP;
			return events;
		}
		,onRender: function(){}
		,onShow: function() {}
		,clkSP:function(e){
			Talent.app.request("apibox:getClassData").done(function(resp){
				console.log(resp)
			});
		}
		,onClose:function(){}
	});
	return Talent.BasePageView.extend({
		mainViewClass : MainView
		,pageTitle: 'apibox'
	});
});
