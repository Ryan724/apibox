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
			Talent.app.vent.on('route',this.setActive, this);
		}
		,onRender: function() {
			this.setActive();
		}
		,setActive: function() {
			Talent.app.request('history:getFragments').done(_.bind(function(fragments) {
				this.$el.find('.navbar li').removeClass('active');
				this.$el.find('li.'+fragments[0]).addClass('active');
			},this));
		}
	});

});