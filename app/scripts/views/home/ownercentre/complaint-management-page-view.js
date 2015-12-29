define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var ComplaintManagementView = Talent.ItemView.extend({
			template: jst['home/ownercentre/complaint-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return ComplaintManagementView;
	});