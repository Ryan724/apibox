define([
	'talent',
	'templates/home',
	'views/home/welcome/index-page-view',
], function(
	Talent,
	jst,
	HeaderPageView,
	FooterPageView) {
	var MainView = Talent.Layout.extend({
		template: jst['home/index-page'],
		className: 'home-page-container',
		regions: {
			header: ".header",
			footer:".footer"
		},
		ui: {},
		events: function() {
			var events = {};
			return events;
		},
		initialize: function() {},
		onRender: function() {},
		onShow: function() {
			this.header.show(new HeaderPageView());
			this.footer.show(new FooterPageView());
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: 'Home'
	});
});