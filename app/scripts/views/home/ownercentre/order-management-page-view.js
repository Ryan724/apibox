define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var OrderManagementView = Talent.ItemView.extend({
			template: jst['home/ownercentre/order-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return OrderManagementView;
	});