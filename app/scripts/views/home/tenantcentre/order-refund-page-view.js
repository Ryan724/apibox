define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var OrderRefundView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/order-refund-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return OrderRefundView;
	});