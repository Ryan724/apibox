define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var RefundProcessingView = Talent.ItemView.extend({
			template: jst['home/ownercentre/refund-processing-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return RefundProcessingView;
	});