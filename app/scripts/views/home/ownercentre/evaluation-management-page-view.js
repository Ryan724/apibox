define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var EvaluationManagementView = Talent.ItemView.extend({
			template: jst['home/ownercentre/evaluation-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return EvaluationManagementView;
	});