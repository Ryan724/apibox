define(['talent'
	,'templates/home'
	,'views/common/page-regions/header-view'
],function(Talent
	,jst
	,Header
) {
	/**
	 * Inner main view class
	 * @class HomeView~MainView
	 * @extends {Backbone.View}
	 */	
	var header = Talent.Model.extend({
			defaults:{}
	});
	var MainView = Talent.Layout.extend(
	{
		template: jst['home/index-page']
		,className: 'home-page-container'
		,initialize: function() {
			this.headerView = new Header({
				model:new header()
			});
		}
		,events:function(){
			var events= {};
			events["click .single-p"] = this.clkSP;
			return events;
		}
		,regions: {
			"header":".indexheader"
		}
		,onRender: function(){}
		,onShow: function() {
			this.header.show(this.headerView);

		}
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
