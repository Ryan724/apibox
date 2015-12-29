define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var SettlementDetailsView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/settlement-details-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return SettlementDetailsView;
	});