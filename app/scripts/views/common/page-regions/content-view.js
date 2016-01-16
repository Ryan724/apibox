define(['talent','templates/common'], function(Talent, jst) {
	/**
	* Content view class
	* @author nobody
	* @extends {Talent.CompositeView}
	* @class ContentView
	*/
	return Talent.CompositeView.extend(
		/** @lends ContentView.prototype */
	{
		template: jst['common/page-regions/content']
		,initialize: function() {
		
		}
		,onRender: function() {
		
		}
	});

});