define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var LeaseStatisticsView = Talent.ItemView.extend({
			template: jst['home/ownercentre/lease-statistics-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return LeaseStatisticsView;
	});