define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var TemplateManagementView = Talent.ItemView.extend({
			template: jst['home/ownercentre/template-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return TemplateManagementView;
	});