define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	) {
		var HeaderView = Talent.ItemView.extend({
			template: jst['home/seach-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .immediate-baoban-btn"]=this.immediateBaoban;
				events["click .map-find-btn"]=this.mapFind;
				events["blur .seach-input"] = this.clearInput;
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			immediateBaoban:function(){
				 Talent.app.execute('history:navigate', '#home/seachhouse', true);
				 this.trigger("navigate");
			},
			mapFind:function(){
				alert("地图找房")
			},
			clearInput:function(){
				this.$(".seach-input").val("");
			},
			onClose: function() {}
		});

		return HeaderView;
	});