define(['talent', 'templates/common'],
	function(Talent, jst) {
	/**
	* Sidebar view class
	* @author nobody
	* @extends {Talent.Layout}
	* @class SidebarView
	*/
	return Talent.Layout.extend(
		/** @lends SidebarView.prototype */
	{
		template: jst['common/page-regions/sidebar']
		,tagName : 'ul'
		,className : 'nav nav-list'
	});

});