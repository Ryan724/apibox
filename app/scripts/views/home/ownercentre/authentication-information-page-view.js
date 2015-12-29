define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var AuthenticationInformationView = Talent.ItemView.extend({
			template: jst['home/ownercentre/authentication-information-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
		    Close: function() {}
		});

		return AuthenticationInformationView;
	});