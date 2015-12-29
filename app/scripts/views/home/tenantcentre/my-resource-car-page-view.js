define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var MyResourceCarView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/my-resource-car-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .contrast-btn"]=this.toContrast;
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			toContrast:function(){
             Talent.app.execute('history:navigate', '#home/housingcontrast', true);
               $("#pages").remove();
			},
		    Close: function() {}
		});

		return MyResourceCarView;
	});