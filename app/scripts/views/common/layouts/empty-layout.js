define(['talent', 'templates/common'],
	function(Talent, jst) {

	var Layout = Talent.BaseEmptyLayout.extend({
		template: jst['common/layouts/empty-layout']
	});
	/**
	 * Layout的单例是为了页面切换时，实现局部刷新
	 * 
	 */
	return new Layout;
});