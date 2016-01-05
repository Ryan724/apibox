define(['talent','templates/common'], function(Talent, jst) {
	/**
	* Header view class
	* @author nobody
	* @extends {Talent.CompositeView}
	* @class HeaderView
	*/
	return Talent.CompositeView.extend(
		/** @lends HeaderView.prototype */
	{
		template: jst['common/page-regions/header']
		,initialize: function() {
		
		}
		,onRender: function() {
		
		}
	});

});