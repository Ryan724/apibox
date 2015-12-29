define([
	'talent',
	'templates/home',
	'views/home/header-page-view',
	'views/home/footer-page-view',
	'views/home/tenantcentre/tenant-menu-page-view',
	'views/home/tenantcentre/basic-information-page-view',
	'views/home/tenantcentre/password-management-page-view',
	'views/home/tenantcentre/common-invoice-page-view',
	'views/home/tenantcentre/common-address-page-view',
	'views/home/tenantcentre/authentication-information-page-view',
	'views/home/tenantcentre/my-reservation-page-view',
	'views/home/tenantcentre/my-order-page-view',
	'views/home/tenantcentre/order-refund-page-view',
	'views/home/tenantcentre/settlement-details-page-view',
	'views/home/tenantcentre/evaluation-management-page-view',
	'views/home/tenantcentre/complaint-management-page-view',
	'views/home/tenantcentre/my-resource-car-page-view'
], function(
	Talent,
	jst,
	HeaderPageView,
	FooterPageView,
	TenantMenuView,
	BasicInformationView,
	PasswordManagementView,
	CommonInvoiceView,
	CommonAddressView,
	AuthenticationInformationView,
	MyReservationView,
	MyOrderView,
	OrderRefundView,
	SettlementDetailsView,
	EvaluationManagementView,
	ComplaintManagementView,
	MyResourceCarView) {
	var MainView = Talent.Layout.extend({
		template: jst['home/tenantcentre/index-page'],
		className: 'home-page-container',
		regions: {
			header: ".header",
			footer: ".footer",
			tenantMenu: ".tenant-menu-location",
			tenantContent: ".tenant-content-location"
		},
		ui: {},
		events: function() {
			var events = {};
			return events;
		},
		initialize: function() {
			/*this.registercontactModel = new Talent.Model({
				"registercontact": [{
					"RegisterID":"",
        	        "Ordinal":"",
        	        "LinkMan":"",
        	        "JobTitle":"",
        	        "LinkPhone":"",
        	        "Subscript":"",
        	        "Contract":"",
        	        "Disable":"",
        	        "Order":""
				}],
			});
            this.registercontactCollection = new Talent.Collection({
            	model: this.registercontactModel,
            	nextOrder: function() {
					if (!this.length) return 1;
					 return this.last().get("Order") + 1;
					}
            });*/
             this.basictableModel = new Talent.Model();
             this.adresstableModel = new Talent.Model();
		},
		onRender: function() {},
		onShow: function() {
			this.header.show(new HeaderPageView());
			this.footer.show(new FooterPageView());
			this.TenantMenuView =new TenantMenuView();
			this.listenTo(this.TenantMenuView,"change:content",this.changeContent);
			this.tenantMenu.show(this.TenantMenuView);
		},
		changeContent:function(flag){
        	switch(flag){
        		case "my-resource-car":
					this.tenantContent.show(new MyResourceCarView());
					break;
				case "my-reservation":
					this.tenantContent.show(new MyReservationView());
					break;
				case "my-order":
					this.tenantContent.show(new MyOrderView());
					break;
				case "order-refund":
					this.tenantContent.show(new OrderRefundView());
					break;
				case "settlement-details":
					this.tenantContent.show(new SettlementDetailsView());
					break;
				case "evaluation-management":
					this.tenantContent.show(new EvaluationManagementView());
					break;
				case "complaint-management":
					this.tenantContent.show(new ComplaintManagementView());
					break;
				case "basic-information":
					this.tenantContent.show(new BasicInformationView({
						model:this.basictableModel
					}));
					break;
				case "authentication-information":
					this.tenantContent.show(new AuthenticationInformationView());
					break;
				case "common-invoice":
					this.tenantContent.show(new CommonInvoiceView());
					break;
				case "common-address":
					this.tenantContent.show(new CommonAddressView({
						model:this.adresstableModel
					}));
					break;
				case "password-management":
					this.tenantContent.show(new PasswordManagementView());
					break;
           }     
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: '租户中心'
	});
});