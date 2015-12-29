define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	) {
		var TenantMenuView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/tenant-menu-page'],
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
					case "my-resource-car-btn":
						this.trigger("change:content","my-resource-car");
						break;
					case "my-reservation-btn":
						this.trigger("change:content","my-reservation");
						break;
					case "my-order-btn":
						this.trigger("change:content","my-order");
						break;
					case "order-refund-btn":
						this.trigger("change:content","order-refund");
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
					case "basic-information-btn":
						this.trigger("change:content","basic-information");
						break;
					case "authentication-information-btn":
						this.trigger("change:content","authentication-information");
						break;
					case "common-invoice-btn":
						this.trigger("change:content","common-invoice");
						break;
					case "common-address-btn":
						this.trigger("change:content","common-address");
						break;
					case "password-management-btn":
						this.trigger("change:content","password-management");
						break;
				}
			},
			onClose: function() {}
		});

		return TenantMenuView;
	});