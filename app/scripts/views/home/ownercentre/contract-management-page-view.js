define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var ContractManagementView = Talent.ItemView.extend({
			template: jst['home/ownercentre/contract-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return ContractManagementView;
	});