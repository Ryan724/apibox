define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var HousingManagementView = Talent.ItemView.extend({
			template: jst['home/ownercentre/housing-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return HousingManagementView;
	});