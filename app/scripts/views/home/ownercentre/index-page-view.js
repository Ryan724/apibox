define([
	'talent',
	'templates/home',
	'views/home/header-page-view',
	'views/home/footer-page-view',
	'views/home/ownercentre/owner-menu-page-view',
	'views/home/ownercentre/housing-management-page-view',
	'views/home/ownercentre/lease-statistics-page-view',
	'views/home/ownercentre/reservation-management-page-view',
	'views/home/ownercentre/order-management-page-view',
	'views/home/ownercentre/refund-processing-page-view',
	'views/home/ownercentre/settlement-details-page-view',
	'views/home/ownercentre/evaluation-management-page-view',
	'views/home/ownercentre/complaint-management-page-view',
	'views/home/ownercentre/template-management-page-view',
	'views/home/ownercentre/contract-management-page-view',
	'views/home/ownercentre/basic-information-page-view',
	'views/home/ownercentre/authentication-information-page-view',
	'views/home/ownercentre/password-management-page-view'
], function(
	Talent,
	jst,
	HeaderPageView,
	FooterPageView,
	OwnerMenuView,
	HousingManagementView,
	LeaseStatisticsView,
	ReservationManagementView,
	OrderManagementView,
	RefundProcessingView,
	SettlementDetailsView,
	EvaluationManagementView,
	ComplaintManagementView,
	TemplateManagementView,
	ContractManagementView,
	BasicInformationView,
	AuthenticationInformationView,
	PasswordManagementView) {
	var MainView = Talent.Layout.extend({
		template: jst['home/ownercentre/index-page'],
		className: 'home-page-container',
		regions: {
			header: ".header",
			footer: ".footer",
			ownerMenu: ".owner-menu-location",
			ownerContent: ".owner-content-location"
		},
		ui: {},
		events: function() {
			var events = {};
			return events;
		},
		initialize: function() {
			this.reservationtableModel = new Talent.Model();
		},
		onRender: function() {},
		onShow: function() {
			this.header.show(new HeaderPageView());
			this.footer.show(new FooterPageView());
			this.OwnerMenuView =new OwnerMenuView();
			this.listenTo(this.OwnerMenuView,"change:content",this.changeContent);
			this.ownerMenu.show(this.OwnerMenuView);
		},
		changeContent:function(flag){
			switch(flag){
					case "owner-center":
						alert("业主中心");
						break;
					case "housing-management":
						this.ownerContent.show(new HousingManagementView());
						break;
					case "lease-statistics":
						this.ownerContent.show(new LeaseStatisticsView());
						break;
					case "reservation-management":
						this.ownerContent.show(new ReservationManagementView({
							model:this.reservationtableModel
						}));
						break;
					case "order-management":
						this.ownerContent.show(new OrderManagementView());
						break;
					case "refund-processing":
						this.ownerContent.show(new RefundProcessingView());
						break;
					case "settlement-details":
						this.ownerContent.show(new SettlementDetailsView());
						break;
					case "evaluation-management":
						this.ownerContent.show(new EvaluationManagementView());
						break;
					case "complaint-management":
						this.ownerContent.show(new ComplaintManagementView());
						break;
					case "template-management":
						this.ownerContent.show(new TemplateManagementView());
						break;
					case "contract-management":
						this.ownerContent.show(new ContractManagementView());
						break;
					case "basic-information":
						this.ownerContent.show(new BasicInformationView());
						break;
					case "authentication-information":
						this.ownerContent.show(new AuthenticationInformationView());
						break;
					case "password-management":
						this.ownerContent.show(new PasswordManagementView());
						break;
				}
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: '业主中心'
	});
});