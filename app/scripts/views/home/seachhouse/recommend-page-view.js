define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	) {
		var MenuView = Talent.ItemView.extend({
			template: jst['home/seachhouse/recommend-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			onClose: function() {}
		});

		return MenuView;
	});