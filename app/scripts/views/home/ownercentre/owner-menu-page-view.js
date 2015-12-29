define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	) {
		var OwnerMenuView = Talent.ItemView.extend({
			template: jst['home/ownercentre/owner-menu-page'],
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
					case "owner-center-btn":
						alert("业主中心");
						break;
					case "housing-management-btn":
						this.trigger("change:content","housing-management");
						break;
					case "lease-statistics-btn":
						this.trigger("change:content","lease-statistics");
						break;
					case "reservation-management-btn":
						this.trigger("change:content","reservation-management");
						break;
					case "order-management-btn":
						this.trigger("change:content","order-management");
						break;
					case "refund-processing-btn":
						this.trigger("change:content","refund-processing");
						break;
					case "settlement-details-btn":
						this.trigger("change:content","settlement-details");
						break;
					case "evaluation-management-btn":
						this.trigger("change:content","evaluation-management");
						break;
					case "complaint-management-btn":
						this.trigger("change:content","complaint-management");
						break;
					case "template-management-btn":
						this.trigger("change:content","template-management");
						break;
					case "contract-management-btn":
						this.trigger("change:content","contract-management");
						break;
					case "basic-information-btn":
						this.trigger("change:content","basic-information");
						break;
					case "authentication-information-btn":
						this.trigger("change:content","authentication-information");
						break;
					case "password-management-btn":
						this.trigger("change:content","password-management");
						break;
				}
			},
			onClose: function() {}
		});

		return OwnerMenuView;
	});