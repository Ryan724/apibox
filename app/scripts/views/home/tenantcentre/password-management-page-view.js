define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var PasswordManagementView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/password-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return PasswordManagementView;
	});