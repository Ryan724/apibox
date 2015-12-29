define([
	'talent',
	'templates/home',
	'views/home/header-page-view',
	'views/home/welcome/content-page-view',
	'views/home/welcome/register-page-view',
], function(
	Talent,
	jst,
	HeaderPageView,
	WelcomeContentView,
	RegisterOrLoginView) {

	var MainView = Talent.Layout.extend({
		template: jst['home/welcome/index-page'],
		className: 'home-page-container',
		regions: {
			header: ".header-full-width",
			welcomeCont: ".welcome-content"
		},
		ui: {},
		events: function() {
			var events = {};
			return events;
		},
		initialize: function() {

		},
		onRender: function() {
			var self = this;
			// Talent.app.request("welcome:getIndexData", {
			// 	'CityID': '021'
			// }).done(function(resp) {
			// 	debugger
			// 	self.contData = resp
				self.contData = {
					"adimgs": ["images/background-1.png", "images/background-2.png", "images/background-3.png"],
					"imgs": [{
						"Pulicityid": 1,
						"PublicityUrl": "https://www.baidu.com/",
						"PublicityImg": [{
							"img1": "images/background-1.png",
							"img5": "images/background-4.png"
						}]
					}],
					"news": [{
						"img": "images/background-1.png",
						"url": "https://www.baidu.com/"
					}]
				}
				self.showContView();
			// });
		},
		onShow: function() {
			var headerView = new HeaderPageView();
			this.header.show(headerView);
			this.listenTo(headerView, "user", this.showRegisterOrLoginView)
			this.showContView();

		},
		showContView: function() {
			var contModel = new Talent.Model(this.contData);
			this.welcomeCont.show(new WelcomeContentView({
				model: contModel
			}));
		},
		showRegisterOrLoginView: function(param) {
			var RLModel = new Talent.Model({
				flag: param
			});
			var registerOrLoginView = new RegisterOrLoginView({
				model: RLModel
			})
			this.welcomeCont.show(registerOrLoginView);
			this.listenTo(registerOrLoginView, "to:register", this.showRegisterOrLoginView)
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: '包办网'
	});
});