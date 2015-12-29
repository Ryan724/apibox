define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	) {
		var MenuView = Talent.ItemView.extend({
			template: jst['home/menu-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .menu-close"]=this.close;
				events["click .menu-btn"]=this.clickMenu;
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			clickMenu:function(e){
				var node = $(e.currentTarget);
				var currentId=node.attr("id");
				switch(currentId){
					case "about-bb-btn":
						alert("1");
						break;
					case "contact-bb-btn":
						alert(2);
						break;
					case "help-center-btn-btn":
						alert(3);
						break;
					case "user-protocol-btn":
						alert(4);
						break;
					case "terms-privacy-btn":
						alert(5);
						break;
				}
			},
			onClose: function() {}
		});

		return MenuView;
	});