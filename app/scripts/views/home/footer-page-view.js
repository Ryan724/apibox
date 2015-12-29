define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	) {
		var HeaderView = Talent.ItemView.extend({
			template: jst['home/footer-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			showCata:function(){
				
			},
			onClose: function() {}
		});

		return HeaderView;
	});