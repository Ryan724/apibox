define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var MyOrderView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/my-order-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return MyOrderView;
	});