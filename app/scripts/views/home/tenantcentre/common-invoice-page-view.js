define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var CommonInvoiceView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/common-invoice-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return CommonInvoiceView;
	});